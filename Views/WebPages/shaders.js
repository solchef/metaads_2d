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
uniform float brightness; 
uniform vec3 color;

void main()
{
        vec4 lansd= texture2D(bumpTexture, vUv);
         vec4 background= texture2D(bumpTexture2, vUv);
        vec4 backGround1= vec4(mix(mix(lansd.rgb,background.rgb,background.a),lansd.rgb,lansd.a),0.1);
        gl_FragColor = vec4(backGround1.rgb * brightness,0.1);
}
`
//   vec4 background= vec4(back.rgb * brightness,0.1);

// float a = (length(backGround1 - color) - 0.5) * 7.0;
