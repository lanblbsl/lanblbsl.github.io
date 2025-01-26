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
