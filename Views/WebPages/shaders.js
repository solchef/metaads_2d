export const vertexShader = `
varying vec2 vUv;

void main()
{
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
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

void main()
{
        vec4 lansd= texture2D(bumpTexture, vUv);
        vec4 background= texture2D(bumpTexture2, vUv);
        vec4 backGround1= vec4(mix(mix(lansd.rgb,background.rgb,background.a),lansd.rgb,lansd.a),1.0);
        gl_FragColor = backGround1;
}
`
