$(window).load(function(){
	
	// We are listening to the window.load event, so we can be sure
	// that the images in the slideshow are loaded properly.


	// Testing wether the current browser supports the canvas element:
	var supportCanvas = 'getContext' in document.createElement('canvas');

	// The canvas manipulations of the images are CPU intensive,
	// this is why we are using setTimeout to make them asynchronous
	// and improve the responsiveness of the page.

	var slides = $('#slideshow li'),
		current = 0,
		slideshow = {width:0,height:0};

	setTimeout(function(){
		
		window.console && window.console.time && console.time('Generated In');
		
		if(supportCanvas){
			$('#slideshow img').each(function(){

				if(!slideshow.width){
					// Taking the dimensions of the first image:
					slideshow.width = this.width;
					slideshow.height = this.height;
				}
				
				// Rendering the modified versions of the images:
				createCanvasOverlay(this);
			});
		}
		
		window.console && window.console.timeEnd && console.timeEnd('Generated In');
		
		$('#slideshow .arrow').click(function(){
			var li			= slides.eq(current),
				canvas		= li.find('canvas'),
				nextIndex	= 0;

			// Depending on whether this is the next or previous
			// arrow, calculate the index of the next slide accordingly.
			
			if($(this).hasClass('next')){
				nextIndex = current >= slides.length-1 ? 0 : current+1;
			}
			else {
				nextIndex = current <= 0 ? slides.length-1 : current-1;
			}

			var next = slides.eq(nextIndex);
			
			if(supportCanvas){

				// This browser supports canvas, fade it into view:

				canvas.fadeIn(function(){
					
					// Show the next slide below the current one:
					next.show();
					current = nextIndex;
					
					// Fade the current slide out of view:
					li.fadeOut(function(){
						li.removeClass('slideActive');
						canvas.hide();
						next.addClass('slideActive');
					});
				});
			}
			else {
				
				// This browser does not support canvas.
				// Use the plain version of the slideshow.
				
				current=nextIndex;
				next.addClass('slideActive').show();
				li.removeClass('slideActive').hide();
			}
		});
		
	},100);

	// This function takes an image and renders
	// a version of it similar to the Overlay blending
	// mode in Photoshop.
	
	function createCanvasOverlay(image){

		var canvas			= document.createElement('canvas'),
			canvasContext	= canvas.getContext("2d");
		
		// Make it the same size as the image
		canvas.width = slideshow.width;
		canvas.height = slideshow.height;
		
		// Drawing the default version of the image on the canvas:
		canvasContext.drawImage(image,0,0);
		

		// Taking the image data and storing it in the imageData array:
		var imageData	= canvasContext.getImageData(0,0,canvas.width,canvas.height),
			data		= imageData.data;
		
		// Loop through all the pixels in the imageData array, and modify
		// the red, green, and blue color values.
		
		for(var i = 0,z=data.length;i<z;i++){
			
			// The values for red, green and blue are consecutive elements
			// in the imageData array. We modify the three of them at once:
			
			data[i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			data[++i] = ((data[i] < 128) ? (2*data[i]*data[i] / 255) : (255 - 2 * (255 - data[i]) * (255 - data[i]) / 255));
			
			// After the RGB elements is the alpha value, but we leave it the same.
			++i;
		}
		
		// Putting the modified imageData back to the canvas.
		canvasContext.putImageData(imageData,0,0);
		
		// Inserting the canvas in the DOM, before the image:
		image.parentNode.insertBefore(canvas,image);
	}
	
});
var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
window.document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.setAttribute('style', 'position:fixed;left:0;top:0;pointer-events:none;filter:blur(2px);')
var clicks = []
var points = [] //������������
var live = 50 //���50������
var colors = [  //��ѡ������ɫ����
    "236, 204, 104",
    "255, 71, 87",
    "112, 161, 255",
    "123, 237, 159"
]
window.addEventListener("mousemove", function (evt) { //��������ƶ��¼�
    for (var i = 0; i < 15; i++) { //���15������
        points.push({
            sx: evt.x, //��굱ǰ������Ϊ��������
            sy: evt.y,
            vx: 0.5 - Math.random(), //x�ἰy����ƶ�������ȡֵ��ΧΪ-0.5 ~ 0.5
            vy: 0.5 - Math.random(),
            life: live, //�������
            color: colors[parseInt(Math.random() * colors.length)], //���ѡ����ɫ
            size: Math.random() * 5 //������ӳߴ磬ȡֵ��ΧΪ0~5
        })
    }
})
window.addEventListener("click", function (evt) { //��������¼�
    for (var i = 0; i < 100; i++) {
        clicks.push({
            sx: evt.x,
            sy: evt.y,
            color: colors[parseInt(Math.random() * colors.length)],
            life: live,
            vx: 0.5 - Math.random(), //x�ἰy����ƶ�������ȡֵ��ΧΪ-0.5 ~ 0.5
            vy: 0.5 - Math.random(),
        })
    }
})
function drawpoints() { //��������
    ctx.clearRect(0, 0, canvas.width, canvas.height) //����
    for (var i = 0; i < points.length; i++) { //��������
        point = points[i] //���嵥������
        ctx.beginPath()
        ctx.arc(point.sx, point.sy, point.size, Math.PI * 2, false) //�����������Ի�Բ
        ctx.fillStyle = "rgba(" + point.color + "," + point.life / live + ")" //���������������������ɫ��͸����
        ctx.fill() //�����ɫ
        point.life-- //����ֵ��1
        if (point.life <= 0) { //����ֵΪ0�������������ɾ��
            points.splice(i, 1)
        }
        point.sx += point.vx * 3  //��������ֵ�ı�����λ��
        point.sy += point.vy * 3
        point.vy += 0.03
    }
    for (var i = 0; i < clicks.length; i++) { //���Ƶ��Ч��
        click = clicks[i]
        ctx.fillStyle = "rgba(" + click.color + "," + click.life / live + ")"
        ctx.fillRect(click.sx, click.sy, 3, 3)
        click.sx += click.vx * 10
        click.sy += click.vy * 10
        click.vy += 0.02
        click.life--
        if (click.life <= 0) {
            clicks.splice(i, 1)
        }
    }
}
setInterval(drawpoints, 20) //20�������һ��
document.getElementById('down-arrow').addEventListener('click', function () {
	const target = document.querySelector('.header_btm');
	target.scrollIntoView({ behavior: 'smooth' });
});