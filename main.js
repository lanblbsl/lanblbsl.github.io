// 获取sparkle元素
const sparkle = document.querySelector(".sparkle");

// 当前星星的个数
var current_star_count = 0;

// 常量定义
// 最大星星数
const MAX_STARS = 60;
// 生成星星的时间间隔
const STAR_INTERVAL = 16;

// 星星的生命周期
const MAX_STAR_LIFE = 3;
const MIN_STAR_LIFE = 1;

// 星星的大小
const MAX_STAR_SIZE = 70;
const MIN_STAR_SIZE = 30;

// 星星的移动距离
const MIN_STAR_TRAVEL_X = 100;
const MIN_STAR_TRAVEL_Y = 100;

// 星星类
const Star = class {
  constructor() {
    // 设置星星的随机大小
    this.size = this.random(MAX_STAR_SIZE, MIN_STAR_SIZE);

    // 设置星星的随机位置
    this.x = this.random(
      sparkle.offsetWidth * 0.75,
      sparkle.offsetWidth * 0.25
    );
    this.y = sparkle.offsetHeight / 2 - this.size / 2;

    // 设置星星的随机方向
    this.x_dir = this.randomMinus();
    this.y_dir = this.randomMinus();

    // 设置星星的最大移动距离
    this.x_max_travel =
      this.x_dir === -1 ? this.x : sparkle.offsetWidth - this.x - this.size;
    this.y_max_travel = sparkle.offsetHeight / 2 - this.size;

    // 设置星星的移动距离
    this.x_travel_dist = this.random(this.x_max_travel, MIN_STAR_TRAVEL_X);
    this.y_travel_dist = this.random(this.y_max_travel, MIN_STAR_TRAVEL_Y);

    // 设置星星的结束位置
    this.x_end = this.x + this.x_travel_dist * this.x_dir;
    this.y_end = this.y + this.y_travel_dist * this.y_dir;

    // 设置星星的生命周期
    this.life = this.random(MAX_STAR_LIFE, MIN_STAR_LIFE);

    // 创建星星元素
    this.star = document.createElement("div");
    // 设置星星的样式
    this.star.classList.add("star");

    // 设置星星的样式属性
    this.star.style.setProperty("--start-left", this.x + "px");
    this.star.style.setProperty("--start-top", this.y + "px");

    this.star.style.setProperty("--end-left", this.x_end + "px");
    this.star.style.setProperty("--end-top", this.y_end + "px");

    this.star.style.setProperty("--star-life", this.life + "s");
    this.star.style.setProperty("--star-life-num", this.life);

    this.star.style.setProperty("--star-size", this.size + "px");
    this.star.style.setProperty("--star-color", this.randomRainbowColor());
  }

  // 添加星星
  draw() {
    sparkle.appendChild(this.star);
  }

  // 删除星星
  pop() {
    sparkle.removeChild(this.star);
  }

  // 生成指定范围的随机数
  random(max, min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 生成随机颜色
  randomRainbowColor() {
    return "hsla(" + this.random(360, 0) + ", 100%, 50%, 1)";
  }

  // 生成随机正负号
  randomMinus() {
    return Math.random() > 0.5 ? 1 : -1;
  }
};

// 执行代码
setInterval(() => {
  // 判断星星是否太多
  if (current_star_count >= MAX_STARS) {
    return;
  }

  // 增加星星计数器
  current_star_count++;

  // 创建星星
  var newStar = new Star();

  // 添加星星
  newStar.draw();

  setTimeout(() => {
    // 减少星星计数器
    current_star_count--;

    // 删除星星
    newStar.pop();
  }, newStar.life * 1000);
}, STAR_INTERVAL);
// 要逐字显示的文本
const textToShow = "ID:2105736020";
const targetDiv = document.getElementById('targetDiv');
let index = 0;

function showNextChar() {
    if (index < textToShow.length) {
        targetDiv.innerHTML += textToShow.charAt(index);
        // 设置文本颜色为白色
        targetDiv.style.color = 'white';
        index++;
        setTimeout(showNextChar, 100);
    }
}

window.onload = function () {
    showNextChar();
};
