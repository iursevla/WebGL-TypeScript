/**
 * This class contains helper functions to create multiple shaders
 * and to create the program and relate shader with said program
 */
class WebGLHelperFunctions {

    public vertexShaderCode = `
            attribute vec2 pos;
            void main(){ gl_Position = vec4(pos, 0, 1); }
        `;

    public fragmentShaderCode = `
            precision highp float;
            void main() { gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0); }
        `;

    public gl: WebGLRenderingContext;

    constructor(canvasId: string) {
        this.gl = this.getRenderingContext(canvasId);
    }

    /**
     * Gets the rendering context for the canvas element.
     * @param canvasId, the id(on html file) of the canvas element.
     */
    getRenderingContext(canvasId) {
        let canvas = <HTMLCanvasElement>document.getElementById(canvasId);
        let gl = canvas.getContext('webgl');
        return gl;
    }

    /**
     * Creates an association between the vertices and a WebGL buffer.
     * @param vertices, the vertices to associate
     * @param gl, current WebGLRenderingContext
     */
    associateVerticesToBuffer(vertices: [number]) {
        let vertex_buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertex_buffer);
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);
        return vertex_buffer;
    }

    /**
     * Create shader, source and  compile
     * @param sourceShader, code for the shader
     * @param type, type of shader (gl.VERTEX_SHADER or gl.FRAMENT_SHADER)
     */
    createShaders(sourceShader: string, type: number) {
        var shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, sourceShader);
        this.gl.compileShader(shader);
        return shader;
    }

    /**
     * Create the program and then attach shaders(vs and fs) and finally
     * link and use said program.
     * @param vs, vertex shader
     * @param fs, fragment shader
     */
    createProgramAndAttachShaders(vs, fs) {
        let shaderProgram = this.gl.createProgram();
        this.gl.attachShader(shaderProgram, vs);
        this.gl.attachShader(shaderProgram, fs);
        this.gl.linkProgram(shaderProgram);
        this.gl.useProgram(shaderProgram);
        return shaderProgram;
    }

    /**
     * Changes the color of the fragment shader to the given (r,g,b,a) values.
     * @param shaderProgram, the shaderProgram
     * @param r, red value
     * @param g 
     * @param b 
     * @param a, alpha value
     */
    changeFragmentShaderColors(shaderProgram: WebGLProgram, r, g, b, a) {
        var red = this.gl.getUniformLocation(shaderProgram, 'red');
        this.gl.uniform1f(red, r);

        var green = this.gl.getUniformLocation(shaderProgram, 'green');
        this.gl.uniform1f(green, g);

        var blue = this.gl.getUniformLocation(shaderProgram, 'blue');
        this.gl.uniform1f(blue, b);

        var alpha = this.gl.getUniformLocation(shaderProgram, 'alpha');
        this.gl.uniform1f(alpha, a);
    }

    /**
     * Prints current seconds to help see if the ts compiler already
     * compiled the TS to JS
     */
    printSeconds() {
        console.log(new Date(Date.now).getSeconds());
    }
}