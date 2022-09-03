import React, { useEffect, useRef, useState } from 'react';
import {ReactSVGPanZoom, fitSelection, zoomOnViewerCenter, fitToViewer} from 'react-svg-pan-zoom'
import { selectLand, selectUpdateImage, setLand, setShowMenu, setViewState } from '../../components/reducers/Settings';
import { store } from '../../components/store';
import { useAppSelector } from '../../components/store/hooks';
import { useWeb3Context } from '../../context';
import { MetaadsContractUnsigned } from '../../utils/readOnly';
import { returnLand } from '../../utils/returnLand';

const CanvasGrid = (props: any) => {  

    const [tool, setTool] = useState('auto');
    const Viewer = useRef(null);
    const [value, setValue] = useState({
        viewerHeight: 400,
        viewerWidth: 400,
        SVGHeight: 10001,
        SVGMinX: 0,
        SVGMinY: 0,
        SVGWidth: 10001,
        miniatureOpen: true,
        // a: 0.04056742205903155,
        // b: 0,
        // c: 0,
        // d: 0.04056742205903155,
        // e: 721.7607038365427,
        // f: 268.517784620847,
        // focus: true,
        // lastAction: "zoom",
      

        
    });
    const [selector, setSelector] = useState<any>();
    const [imagePreview, setImagePreview] = useState<any>(null);
    const [parcels, setParcels] = useState([])
    const {address} = useWeb3Context();
    const land = useAppSelector(selectLand)
    const imageStore = useAppSelector(selectUpdateImage)

    useEffect(() => {
        Viewer.current.zoom(500, 0, 0.08);
      }, []);

        /* Read all the available methods in the documentation */
  const _zoomOnViewerCenter1 = () => Viewer.current.zoomOnViewerCenter(1.1)
  const _zoomOnViewerCenter3 = () => Viewer.current.zoomOnViewerCenter(0.9)

  const _fitSelection1 = () => Viewer.current.fitSelection(40, 40, 200, 200)
  const _fitToViewer1 = () => Viewer.current.fitToViewer()

  /* keep attention! handling the state in the following way doesn't fire onZoom and onPam hooks */
  const _zoomOnViewerCenter2 = () => setValue(zoomOnViewerCenter(value, 1.1))
  const _fitSelection2 = () => setValue(fitSelection(value, 40, 40, 200, 200))
  const _fitToViewer2 = () => setValue(fitToViewer(value))

    


    useEffect(() => {
        MetaadsContractUnsigned.getParcels().then((list) => {
          if (list.length > 0) setParcels(list)
          else {
            setParcels([])
          }
        })
      }, [])

    const handleSelectionEvents = async (x: number,y: number) => {
            returnLand(x, y, parcels, address)
            store.dispatch(
                setLand({
                x: x,
                y: y,
                h: land.h,
                w: land.h,
                })
            )
      }

    const returnSelector = (x: number,y: number) => {
        const coordX = Math.floor(x/10) * 10
        const coordY = Math.floor(y/10) * 10
        setSelector(<rect x={coordX} y={coordY} height={land.h * 10} width={land.w * 10 }style={{fill: "#00cc00"}}/>)
        handleSelectionEvents(coordX/10,coordY/10)
    }

    useEffect(() => {
        setSelector(<rect x={land.x * 10} y={land.y * 10} height={land.h * 10} width={land.w * 10} style={{fill: "#00cc00"}}/>)
    },[land.h, land.w])

    useEffect(() => {
        if(imagePreview){
           setImagePreview(<image xlinkHref={imageStore} x={land.x * 10} y={land.y * 10} height={land.h * 10} width={land.w * 10}/>)
        }
    },[imageStore])
    

    return (
        <>
          {/* <hr/> */}

{/* <button className="btn btn-success" onClick={() => _zoomOnViewerCenter1()}>Zoom on center (mode 1)</button>
<button className="btn btn-success" onClick={() => _zoomOnViewerCenter3()}>Zoom area 200x200 (mode 1)</button>
<button className="btn btn-success" onClick={() => _fitToViewer1()}>Fit (mode 1)</button>
<hr/> */}
{/* 
<button className="btn" onClick={() => _zoomOnViewerCenter2()}>Zoom on center (mode 2)</button>
<button className="btn" onClick={() => _fitSelection2()}>Zoom area 200x200 (mode 2)</button>
<button className="btn" onClick={() => _fitToViewer2()}>Fit (mode 2)</button>
<hr/> */}
     
        <ReactSVGPanZoom
          ref={Viewer}
          width={10001} height={10001}
          background={"black"}
          SVGBackground={"black"}
          onClick={(event: { x: any; y: any; }) => returnSelector(event.x, event.y)}
          tool={tool}
          onChangeTool={(tool: React.SetStateAction<string>) => setTool(tool)}
          value={value}
        //   onZoom={e => console.log(e)}
        //   onPan={e => console.log('pan')}
          onChangeValue={(value: React.SetStateAction<{}>) => setValue(value)}
          scaleFactorMax= {10}
          scaleFactorMin = {0.07}
          >
            <svg width={10001} height={10001} xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="a" width={10} height={10} patternUnits="userSpaceOnUse">
                    <path d="M10 0H0v10" fill="none" stroke="#a301b9" strokeWidth="1" />
                    </pattern>
                    <pattern id="b" width={100} height={100} patternUnits="userSpaceOnUse">
                    <path fill="url(#a)" d="M0 0h100v100H0z" />
                    <path d="M100 0H0v100" fill="none" stroke="#a301b9" />
                    </pattern>
                </defs>
                <rect style={{width:"100%", height:"100%"}} fill="url(#b)" />
                <image xlinkHref="https://api.quadspace.io/uploads/adspsdace.png" x="0" y="0" width={10001} height={10001}/>
                 {selector}
                 {imagePreview}
                </svg>
        </ReactSVGPanZoom>
        </>
    )

}

export default CanvasGrid
