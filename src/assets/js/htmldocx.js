/*
 * HTML内容生成docx文档（基于：https://github.com/evidenceprime/html-docx-js）
 * 本插件只用于作者参与的项目，未经许可请勿转载
 */

/* global htmlDocx, saveAs, html2canvas */
import echarts from 'echarts'
import saveAs from './FileSaver'
// const htmlDocx=require ('./html-docx.js')
// 解决不能引入问题 挂载在全局widow对象上
import htmlDocx from './html-docx.js'


(function ($) {
    // 'use strict'
    $.fn.html2docx = function (filename,option) {
      console.log(window,saveAs,filename,option)
      var option =option
      if ($(this).length) {
        filename = filename || '未命名'
        var ImageMaxWidth = 620
        var imgscount = 0
        var markup = null
        var $this = $(this).first()
        if (typeof layer !== 'undefined') { layer.msg('正在生成，请稍候...', { icon: 16, time: 0, shade: [0.1, '#000'] }) }
        else if (typeof AMUI === 'object') { $('#btn-word').prop('disabled', true).find('i').attr('class', 'am-icon-circle-o-notch am-icon-spin') }
        else { $('#btn-word').prop('disabled', true).data('value', $('#btn-word').val()).val('请稍候...') }
  
        // 装载基础脚本
        var deferreds = []
        
        // if (typeof saveAs === 'undefined') { deferreds.push($.ajax('//lib.baomitu.com/FileSaver.js/1.3.3/FileSaver.min.js', { dataType: 'script', cache: true })) }
        // if (typeof htmlDocx === 'undefined') { deferreds.push($.ajax('//cdn.psy.com.cn/scripts/html-docx.js', { dataType: 'script', cache: true })) }
        if ($this.find('svg').length && typeof html2canvas === 'undefined') { deferreds.push($.ajax('//cdn.psy.com.cn/scripts/html2canvas.min.js', { dataType: 'script', cache: true })) }
        $.when.apply(null, deferreds).done(makedocx0)
        // makedocx0()
        // console.log(deferreds,$.ajax('//cdn.psy.com.cn/scripts/html-docx.js.', { dataType: 'script', cache: true }))
      }
  
      return this
      // 处理svg元素，由于异步所以分离
      function makedocx0 () {
        var svgs = $this.find('svg')
        if (svgs.length) {
          console.log(1111)
          var deferreds = []
          svgs.each(function () {
            var svg = $(this)
            deferreds.push(
              html2canvas(this).then(function (canvas) {
                svg.after('<img src="' + canvas.toDataURL('image/png') + '">')
                svg.remove()
              })
            )
          })
          $.when.apply(null, deferreds).done(makedocx1)
        }
        else {
          console.log(1111)

          makedocx1()
        }
      }
  
      // 生成docx：处理
      function makedocx1 () {
        // 克隆
        markup = $this.clone(true)
        console.log($this)
  
        // 移除某些节点
        markup.find('iframe,embed,style').remove()
        markup.contents().each(function () {
          var $this = $(this)
          if (this.nodeType === 8 || $this.is('input[type="hidden"]') || $this.is('.word-hidden') || $this.is('.no-word')) { $this.remove() }
        })
  
        // 处理图片
        var imgs = markup.find('img')
        imgscount = imgs.length
        console.log(imgscount)
        if (imgscount === 0) { makedocx2() }
        else {
          var canvas = document.createElement('canvas')
          var ctx = canvas.getContext('2d')
          imgs.each(function () {
            var $img = $(this)
            var src = $img.attr('src')
            // 原来的对应图片
            var img = $this.find('img[src="' + src + '"]').get(0)
            // 已经是base64编码的图片不再处理
            if (src.indexOf('data:') === 0) { makedocx2() }
            else {
              var w = Math.min(img.width, ImageMaxWidth)
              // 只处理宽度大于0的
              if (w === 0) {
                $img.remove()
                makedocx2()
              }
              else {
                var h = img.height * (w / img.width)
                var a = document.createElement('a')
                var dataURL = ''
                a.href = src
                // 同源
                if (a.host === window.location.host) {
                  ctx.clearRect(0, 0, canvas.width, canvas.height)
                  canvas.width = w
                  canvas.height = h
                  ctx.drawImage(img, 0, 0, w, h)
                  dataURL = canvas.toDataURL()
                  $img.attr('src', dataURL).removeAttr('width')
                  makedocx2()
                }
                // 外站
                else {
                  // 获取base64
                  var url = ''
                  src = src.replace(/^(http:\/\/|https:\/\/|\/\/)/gi, '')
                  if (a.host === 'images.weserv.nl') { url = src + '&encoding=base64' }
                  else { url = '//images.weserv.nl/?url=' + src + '&w=' + w + '&encoding=base64' }
                  $.get(url, function (dataURL) {
                    $img.attr('src', dataURL).removeAttr('width')
                    makedocx2()
                  })
                }
                a.remove()
              }
  
            }
  
          })
          canvas.remove()
        }
      }
  
      // 生成docx：生成
      function makedocx2 () {
        if (imgscount > 1) { imgscount-- }
        else {
        // 处理Echarts  
        // 原来获取不到数据是因为markup是克隆的 克隆clone需要传值才会复制数据和事件处理
         markup.find('div.chart').has('canvas,svg').each(function () {
            //div.chart
            var option1 =  $(this).data('option')
           var id = $(this).attr('id')
            var $old = $this.find('#' + id)           
            // var option = $old.data('option')
            var height =500
            var theme = $old.data('theme')
            console.log( $(this),option1)
            // var height = $old.height()
            // 问题 控制台报错 如果不写无法渲染额chart，如果写只要执行到这段代码控制台报错，好像是option一直没有值，因为调用是没有传这个值的
            // console.log( $(this),echarts,id,$old,option,theme,height)
          //  var $new = $('<div style="width:' + ImageMaxWidth + 'px;height:' + height + 'px;"></div>')
          //     var dom = $new.get(0)
          //     $.extend(true, option1, { animation: false, toolbox: { show: false }, tooltip: { show: false, trigger: 'none' } })
          //     $(this).after($new)
          //     var mychart = echarts.init(dom, theme)
          //     mychart.setOption(option1)
          //     var src = mychart.getDataURL({ backgroundColor: '#fff', excludeComponents: ['toolbox', 'tooltip'] })
          //     console.log(11111111111111111)
          //     $new.replaceWith('<div style="text-align:center;"><img src="' + src + '"></div>')
          //     mychart.dispose()
            // 克隆的Echarts与已有的冲突，所以新建DOM，重新绘制
            if (option1) {
              console.log(111111111,option1,echarts)

              if (typeof (option1) === 'string') { option1 = JSON.parse(option1) }
              //改变位置解决报错误
               var $new = $('<div style="width:' + ImageMaxWidth + 'px;height:' + height + 'px;"></div>')
              var dom = $new.get(0)
              $.extend(true, option1, { animation: false, toolbox: { show: false }, tooltip: { show: false, trigger: 'none' } })
              $(this).after($new)
              var mychart = echarts.init(dom, theme)
              mychart.setOption(option1)
              var src = mychart.getDataURL({ backgroundColor: '#fff', excludeComponents: ['toolbox', 'tooltip'] })
              console.log(11111111111111111)
              $new.replaceWith('<div style="text-align:center;"><img src="' + src + '"></div>')
              mychart.dispose()
            }
            $(this).remove()
          })
  
          // 处理样式
          markup.find('h1').css({ 'text-align': 'center' })
          markup.find('p').css({ 'text-indent': '2em' })
          markup.find('table').css({ 'border-collapse': 'collapse', 'width': '100%' }).removeAttr('class')
          markup.find('th').css({ 'border': '1px solid #000', 'text-align': 'center', 'background-color': '#e8e8e8' })
          markup.find('td').css({ 'border': '1px solid #000', 'text-align': 'center' })
          markup.find('.am-text-primary').css({ 'color': '#5085FF' }).removeClass('am-text-primary')
          markup.find('.text-left,.am-text-left').css({ 'text-align': 'left' }).removeClass('text-left am-text-left')
          markup.find('.text-center,.am-text-center').css({ 'text-align': 'center' }).removeClass('text-center am-text-center')
          markup.find('.text-right,.am-text-right').css({ 'text-align': 'right' }).removeClass('text-right am-text-right')
          markup.find('.text-top').css({ 'vertical-align': 'top' }).removeClass('text-top')
          markup.find('[class=""]').removeAttr('class')
          markup.find('[contenteditable]').removeAttr('contenteditable')
  
          // 再次移除某些节点
          markup.find('script').remove()
  
          // console.log(markup.html())
  
          var content = '<!DOCTYPE html><html><body>' + markup.html() + '</body></html>'
          var converted = window.htmlDocx.asBlob(content)  
          markup.remove()
          if (typeof layer !== 'undefined') { layer.closeAll() }
          else if (typeof AMUI === 'object') { $('#btn-word').prop('disabled', false).find('i').attr('class', 'am-icon-file-word-o') }
          else { $('#btn-word').prop('disabled', false).val($('#btn-word').data('value')) }
  
          saveAs.saveAs(converted, filename + '.docx')
        }
      }
    }
  })(jQuery)
  