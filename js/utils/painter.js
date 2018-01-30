function drawRectangle(ctx, height, width, x, y, content, isKey, fontSize) {
	ctx.strokeRect(x,y,width,height);
	if(isKey) {
		ctx.fillStyle = 'grey';
		ctx.fillRect(x,y,width,height);
	}
	ctx.fillStyle = 'blue';
	ctx.font = (fontSize ? fontSize/1.5 : height/1.5) + "px Arial";
	ctx.fillText(content, 1 * x , 1 * y + height);
}

var painter = {
	drawRectangle : drawRectangle
}

export default painter;