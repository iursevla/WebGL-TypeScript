
/**
 * Scale triangle
 */
class Scaling {

    draw() {
        //1- Context
        let d = document;
        let canvas = <HTMLCanvasElement>d.getElementById('gl-canvas');
        let gl = canvas.getContext('webgl');

        //2- Create vertex 

        let p0 = [0.0, 0.0];
        let p1 = [0.1, 0.0];
        let p2 = [0.0, 0.1];
        let vertices: number[] = [].concat(p0, p1, p2);

        let vertex_buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertex_buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

        //3- Create shaderCode, Create shaders, source and compile them
        let vshaderCode = `
                attribute vec2 pos;
                uniform mat4 u_xformMatrix;
                void main() { 
                    gl_Position = u_xformMatrix * vec4(pos, 1.0, 1); 
                }
            `;
        let vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vshaderCode);
        gl.compileShader(vshader);

        let fshaderCode = `
                void main(){ gl_FragColor = vec4(0.0,0.0,0.0, 1.0); }
            `;
        let fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fshaderCode);
        gl.compileShader(fshader);

        //4- Create program, attach shaders, link and use said program
        let program = gl.createProgram();
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program)
        gl.useProgram(program)

        //5- Associate shaders to buffer objects
        var pos = gl.getAttribLocation(program, 'pos');
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);

        var Sx = 1.0, Sy = 1.0, Sz = 1.0;
        var xformMatrix = new Float32Array([
            Sx, 0.0, 0.0, 0.0,
            0.0, Sy, 0.0, 0.0,
            0.0, 0.0, Sz, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);

        var u_xformMatrix = gl.getUniformLocation(program, 'u_xformMatrix');
        gl.uniformMatrix4fv(u_xformMatrix, false, xformMatrix);

        //6- Draw the primitive
        gl.drawArrays(gl.TRIANGLES, 0, 3);

        //7- Translate position of triangle n times
        let i = 0;
        /* let cicle = setInterval(() => { //http://stackoverflow.com/a/36547168/5869289
             this.translatePosition(gl, program);
             i++;
             if (i == 100) {
                 console.log("DONE")
                 clearInterval(cicle);
             }
 
         }, 10)*/
    }

    //Translates position of the triangle with +/- Tx, Ty 
    translatePosition(gl: WebGLRenderingContext, program) {
        let [Tx, Ty] = this.generateRandomPoint();
        /*let Tx = 0.5, Ty = 0.5;*/
        let scaling = gl.getUniformLocation(program, 'u_xformMatrix');
        gl.uniform2f(scaling, Tx, Ty);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    //Generate random between -1 and 1
    generateRandomPosition() {
        let mul = Math.random() > 0.5 ? -1 : 1;
        return Math.random() * mul;
    }

    //Uses previous function to generate two positions making a point with both of them.
    generateRandomPoint() {
        let [x, y] = [this.generateRandomPosition(), this.generateRandomPosition()];
        return [x, y];
    }
}