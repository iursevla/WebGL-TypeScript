/**
 * Code to draw points
 */
class Dots {

    //Draws 3 points with 10px size.
    draw() {
        //1- Context
        let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('gl-canvas');
        let gl: WebGLRenderingContext = canvas.getContext('webgl');

        //2- Criar geometria e associar vertex_buffer
        let points = [
            -0.5, -0.5,
            0.0, 0.5,
            -0.25, 0.25
        ]
        let vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW);

        //3- Criar vshader e fshader e associar a programa
        let vshaderCode = `
                attribute vec2 pos;
                void main(){ 
                    gl_Position = vec4(pos, 0.0, 1.0); 
                    gl_PointSize = 10.0;
                }
            `;
        let fshaderCode = `
                void main(){ gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); }
            `;

        let vshader = gl.createShader(gl.VERTEX_SHADER);
        let fshader = gl.createShader(gl.FRAGMENT_SHADER);
        //source and compile shaders
        gl.shaderSource(vshader, vshaderCode);
        gl.compileShader(vshader);
        gl.shaderSource(fshader, fshaderCode);
        gl.compileShader(fshader);

        let program = gl.createProgram();//Criar programa
        gl.attachShader(program, vshader);//attach shaders
        gl.attachShader(program, fshader);//attach shaders

        //link and use program
        gl.linkProgram(program);
        gl.useProgram(program);

        //4- Para as vars dos shaders modificalas (neste caso vshader tem o 'pos')
        var pos = gl.getAttribLocation(program, 'pos');
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);

        gl.drawArrays(gl.POINTS, 0, 3);

 /*       setTimeout(() => {
            console.log("LULZ2")
            let npoints = [0.5, 0.5, -0.5, -0.5, 1.0, 1.0];
            let vertex_buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(npoints), gl.STATIC_DRAW);
            var pos = gl.getAttribLocation(program, 'pos');
            gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(pos);
            gl.drawArrays(gl.POINTS, 0, 3);
        }, 4000)*/
    }

    /**
     * Generate random between min and max
     * @param min 
     * @param max 
     */
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Generate random between min and max -1 and 1
     * @param min 
     * @param max 
     */
    getRandomInt1() {
        let negative = Math.random() > 0.5 ? 1 : -1;
        return Math.random() * negative;
    }


}