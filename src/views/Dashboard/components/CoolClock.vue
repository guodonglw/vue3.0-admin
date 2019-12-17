<template>
  <div class="coolClockWrap">
    <canvas id="coolClockCanvas" :width="canvas.width" :height="canvas.height"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CoolClock extends Vue{
  canvas = {
    width: 300,
    height: 300
  }

  L = 0 //基础半径
  timer: any = null

  drawCoolClock() {
    let canvas = <any>document.getElementById("coolClockCanvas")
    let ctx = canvas.getContext('2d')
    let [x0, y0] = [this.canvas.width / 2, this.canvas.height / 2] //获取圆心x,y
    this.L = this.canvas.width / 2 - 10 //设置圆半径
    let [hourMaxL, hourMinL] = [this.L, this.L - 28] //获取时刻度首位距离x0,y0位置
    let [minMaxL, minMinL] = [this.L - 2, this.L - 15]
    let centerL = 15
    let oDate = new Date() //绑定当前时间
    let oHours = oDate.getHours()
    let oMin = oDate.getMinutes()
    let oSen = oDate.getSeconds()
    let oHoursValue = -90 + oHours * 30 + oMin / 2 //获取小时的角度
    let oMinValue = -90 + oMin * 6
    let oSenValue = -90 + oSen * 6
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //清除画布
    this.drawHoursScale(ctx, x0, y0, 12, 9, hourMaxL, hourMinL) //绘制表盘的时钟刻度scale
    this.drawHoursScale(ctx, x0, y0, 60, 3, minMaxL, minMinL) //绘制表盘分钟刻度
    this.drawScaleNum(ctx, hourMinL - 25, x0, y0) //绘制12个表盘数字
    this.drawTimeNeedle(ctx, x0, y0, 15, 135, oHoursValue) //绘制时针 
    this.drawTimeNeedle(ctx, x0, y0, 8, minMaxL - 15, oMinValue) //绘制分针  
    this.drawTimeNeedle(ctx, x0, y0, 3, minMaxL - 2, oSenValue, '#f3a829') //绘制秒针
    this.drawSenDotted(ctx, '#f3a829', x0, y0, oSenValue - 180, centerL) //绘制秒针尾部
    this.drawCircleCenter(ctx, x0, y0, '#f3a829', centerL) //绘制圆心
  }

  drawHoursScale (ctx, x0, y0, scaleNum, scaleW, maxL, minL){
    for (let i=0; i<scaleNum; i++) {
      let angel = -90 + i * (360 / scaleNum) //角度
      let [x1, y1] = [x0 + Math.cos(angel * Math.PI / 180) * maxL, y0 + Math.sin(angel * Math.PI / 180) * maxL]
      let [x2, y2] = [x0 + Math.cos(angel * Math.PI / 180) * minL, y0 + Math.sin(angel * Math.PI / 180) * minL]
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = scaleW
      ctx.lineCap = "round"
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()
      ctx.closePath()
      ctx.restore()
    }
  }

  drawScaleNum(ctx, L, x0, y0) {
    for (let i = 0; i < 12; i++) {
      let angel = -90 + i * (360 / 12) //角度
      let [x, y] = [x0 + Math.cos(angel * Math.PI / 180) * L, y0 + Math.sin(angel * Math.PI / 180) * L]
      let num = i == 0 ? 12 : i
      ctx.save()
      ctx.beginPath()
      ctx.font = "30px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(num, x, y)
      ctx.closePath()
      ctx.restore()
    }
  }

  drawTimeNeedle(ctx, x0, y0, lineW, L, angel, color = '#000') {
    let [x, y] = [x0 + Math.cos(angel * Math.PI / 180) * L, y0 + Math.sin(angel * Math.PI / 180) * L]
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = color
    ctx.lineWidth = lineW
    ctx.lineCap = "round"
    ctx.moveTo(x0, y0)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
  }

  drawCircleCenter(ctx, x0, y0, color, L) {
    ctx.save()
    ctx.beginPath()
    ctx.shadowBlur = 4
    ctx.shadowColor = "#000"
    ctx.fillStyle = color
    ctx.arc(x0, y0, L, 0, 360 * Math.PI / 180)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  drawSenDotted(ctx, color, x0, y0, angel, L) {
    let [x, y] = [x0 + Math.cos(angel * Math.PI / 180) * L, y0 + Math.sin(angel * Math.PI / 180) * L]
    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.arc(x, y, 7, 0, 360 * Math.PI / 180)
    ctx.fill()
    ctx.closePath()
    ctx.restore()
  }

  private mounted() {
    this.drawCoolClock()
    this.timer = setInterval(() => {
      this.drawCoolClock()
    }, 30)
  }

  private beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="less" scoped>
.coolClockWrap {
  // width: 100%;
  height: 100%;
  background: radial-gradient(#f8f6f5, #f7f5f4, #e4e3e2, #b9b8b7);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}

</style>