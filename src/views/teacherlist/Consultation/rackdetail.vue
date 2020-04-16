
<template>
  <div>
    <table class="tb_title">
      <tbody>
        <tr>
          <th rowspan="3">个案追踪</th>
          <td class="label">姓名：</td>
          <td>孙玥</td>
          <td class="label">学号：</td>
          <td></td>
        
        </tr>
        <tr>
          <td class="label">性别：</td>
          <td>女</td>
          <td class="label">手机：</td>
          <td>aaa</td>
          
        </tr>
        <tr>
          <td class="label">班级：</td>
          <td>演示学校（中学）</td>
          <td class="label">家庭住址/宿舍号：</td>
          <td>wwwwwww</td>
          
        </tr>
      </tbody>
    </table>
    <fieldset>
      <legend>一般信息</legend>
      <table width="100%">
        <tbody>
          <tr>
            <td>1、民族</td>
            <td>
              <input type="text" class="text" name="q_1" value>
            </td>
                      </tr>
          <tr>

            <td>2、父亲年龄</td>
            <td>
              <input type="text" class="text" name="q_2" value>
            </td>
          </tr>
          <tr>
            <td>3、父亲职业</td>
            <td>
              <input type="text" class="text" name="q_3" value>
            </td>
                      </tr>
          <tr>

            <td>4、如果父亲不在世，请问发生在___岁时。（父亲健在的不填写）</td>
            <td>
              <input type="text" class="text" name="q_4" value>
            </td>
          </tr>
          <tr>
            <td>5、母亲年龄</td>
            <td>
              <input type="text" class="text" name="q_5" value>
            </td>
                      </tr>
          <tr>

            <td>6、母亲职业</td>
            <td>
              <input type="text" class="text" name="q_6" value>
            </td>
          </tr>
          <tr>
            <td>7、如果母亲不在世，请问发生在___岁时。（母亲健在的不填写）</td>
            <td>
              <input type="text" class="text" name="q_7" value>
            </td>
                      </tr>
          <tr>

            <td>8、父母婚姻状况</td>
            <td>
              <label>
                <input type="radio" name="q_8" value="良好">良好
              </label>
              <label>
                <input type="radio" name="q_8" value="一般">一般
              </label>
              <label>
                <input type="radio" name="q_8" value="较差">较差
              </label>
              <label>
                <input type="radio" name="q_8" value="离异">离异
              </label>
            </td>
          </tr>
          <tr>
            <td>9、如果父母离异的话，请问发生在___岁时。（父母未离异的不填写）</td>
            <td>
              <input type="text" class="text" name="q_9" value>
            </td>
                      </tr>
          <tr>

            <td>10、是否有寄养经历</td>
            <td>
              <label>
                <input type="radio" name="q_10" value="是">是
              </label>
              <label>
                <input type="radio" name="q_10" value="否">否
              </label>
            </td>
          </tr>
          <tr>
            <td>11、寄养时的年龄（无寄养经历的不填写）</td>
            <td>
              <input type="text" class="text" name="q_11" value>
            </td>
                      </tr>
          <tr>

            <td>12、生源类型</td>
            <td>
              <label>
                <input type="radio" name="q_25" value="农村">农村
              </label>
              <label>
                <input type="radio" name="q_25" value="城市">城市
              </label>
              <label>
                <input type="radio" name="q_25" value="城镇">城镇
              </label>
              <label>
                <input type="radio" name="q_25" value="留学生">留学生
              </label>
            </td>
          </tr>
          <tr>
            <td>13、独生子女</td>
            <td>
              <label>
                <input type="radio" name="q_26" value="是">是
              </label>
              <label>
                <input type="radio" name="q_26" value="否">否
              </label>
            </td>
                      </tr>
          <tr>

            <td>14、家庭经济状况</td>
            <td>
              <label>
                <input type="radio" name="q_27" value="困难">困难
              </label>
              <label>
                <input type="radio" name="q_27" value="不困难">不困难
              </label>
            </td>
          </tr>
          <tr></tr>
        </tbody>
      </table>
      <input type="hidden" name="qnum" value="27">
    </fieldset>
    <fieldset>
      <legend>排查情况</legend>
      <table width="100%">
        <tbody>
          <tr>
            <td width="80" valign="top">基本情况：</td>
            <td>
              <textarea
                name="paicha"
                id="paicha"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td valign="top">采取措施：</td>
            <td>
              <textarea
                name="paicha_deal"
                id="paicha_deal"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>问题分类：</td>
            <td>
              <select name="paicha_type" id="paicha_type">
                <option>无需关注</option>
                <option>学业问题</option>
                <option>恋爱关系</option>
                <option>人际交往</option>
                <option>职业发展</option>
                <option>情绪问题</option>
                <option>躯体疾病</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
    <fieldset>
      <legend>追踪情况</legend>

      <table width="100%">
        <tbody>
          <tr>
            <td width="80"></td>
            <td>（说明：以下两个文本框都要填写内容才算添加成功）</td>
          </tr>
          <tr>
            <td valign="top">基本情况：</td>
            <td>
              <textarea
                name="zz_content"
                id="zz_content"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
                title="两个文本框都要填写内容才算添加成功"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td valign="top">采取措施：</td>
            <td>
              <textarea
                name="zz_deal"
                id="zz_deal"
                style="width: 100%; overflow-x: hidden; word-wrap: break-word; resize: horizontal; height: 46px;"
                title="两个文本框都要填写内容才算添加成功"
              ></textarea>
            </td>
          </tr>
          <tr>
            <td>问题分类：</td>
            <td>
              <select name="zz_type" id="zz_type">
                <option>无需关注</option>
                <option>学业问题</option>
                <option>恋爱关系</option>
                <option>人际交往</option>
                <option>职业发展</option>
                <option>情绪问题</option>
                <option>躯体疾病</option>
              </select>
            </td>
          </tr>
          <tr>
            <td>状态变更：</td>
            <td>
              <select name="zz_status" id="zz_status">
                <option>正常</option>
                <option>缓解</option>
                <option>持续</option>
                <option>恶化</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </fieldset>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.tb_title {
  margin-bottom: 5px;
  border-collapse: collapse;
  width: 100%;
  .label {
    text-align: right;
    background: #f1f1f1;
  }
}
fieldset {
  margin-bottom: 20px;
  border: 0;
  border-bottom: 1px dashed #ccc;
  padding: 10px 10px;
      font-size: 14px;
;
  legend {
    border-left: 3px solid #499ad1;
    font-size: 14px;
    font-weight: normal;
    color: #499ad1;
    padding-left: 15px;
    height: 25px;
    line-height: 25px;
  }
}
</style>