export const vertexShader = `
varying vec2 vUv;
varying float vAmount;
uniform float bumpScale;
void main()
{
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
}
`
export const vertexShader3d = `
varying vec2 vUv;
uniform sampler2D bumpTexture3;
varying float vAmount;
uniform float bumpScale;
void main()
{
        vec4 bumpData = texture2D( bumpTexture3, uv );
        float displacement= bumpScale * bumpData.r;
        vec4 modelPosition = modelMatrix * vec4(position, 1.0)*displacement;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;
        gl_Position = projectionPosition;
        vUv = uv;
       
}
`
export const fragmentShader = `
varying vec2 vUv;
uniform sampler2D bumpTexture;
uniform sampler2D bumpTexture2;
uniform float brightness; 
uniform vec3 color;

void main()
{
        vec4 lansd= texture2D(bumpTexture, vUv)* (brightness-0.9);
        vec4 background= texture2D(bumpTexture2, vUv)* brightness;
        vec4 backGround1= vec4(mix(lansd.rgb,mix(background.rgb,lansd.rgb,background.a),background.a),1.9);
        gl_FragColor = vec4(backGround1.rgb ,0.1);
}
`
//vec4 background= vec4(back.rgb * brightness,0.1);

//float a = (length(backGround1 - color) - 0.5) * 7.0;

//image without Grid
//vec4 backGround1= vec4(mix(mix(lansd.rgb,background.rgb,background.a),lansd.rgb,lansd.a),0.1);

//image with Grid
//vec4 backGround1= vec4(mix(lansd.rgb,background.rgb,background.a),0.1);
