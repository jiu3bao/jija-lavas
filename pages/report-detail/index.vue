<template>
    <div style='height:100%;overflow-y:scroll;position:relative'>
        <div class='breadcrumb'>
            <p>我的首页</p>
            <p v-if='true'>
                >
                <span @click='$router.back()'>分析报告</span>
            </p>
            <p v-if='true'>
                >
                <span class='blue border-b'>报告详情</span>
            </p>
            <!--p class='time'>{{month}}-{{month}}</p-->
        </div>
        <el-container style='padding-top:66px;flex-direction:column;box-sizing:border-box;'>
            <el-button type='primary' style='align-self: flex-end;width:100px;margin-bottom:12px' @click='addVisible = true' v-if='!detail.mark ||detail.mark.length==0'>添加备注</el-button>
            <el-button type='primary' style='align-self: flex-end;width:100px;margin-bottom:12px' @click='dialogVisible = true;mark=detail.mark' v-else>查看备注</el-button>
            <div id="wenzhang">
                <img src='static/img/mark.png' v-if='detail.mark && detail.mark.length>0 && !addVisible'>
			<div class="head">
				这里是一个智能报告
			</div>

			<pre>
    一、 “法律百科”运用自己的操作系统，通过国际互联网络等手段为会员提供法律信息交流平台。“法律百科”有权在必要时修改服务条款，服务条款一旦发生变动，将会在重要页面上提示修改内容或通过其他形式告知会员。如果会员不同意所改动的内容，可以主动取消获得的网络服务。如果会员继续享用网络服务，则视为接受服务条款的变动。“法律百科”保留随时修改或中断服务而不需知照会员的权利。“法律百科”行使修改或中断服务的权利，不需对会员或第三方负责。
　　二、保护会员隐私权
　　您注册“法律百科”相关服务时，跟据网站要求提供相关个人信息；在您使用“法律百科”服务、参加网站活动、或访问网站网页时，网站自动接收并记录的您浏览器上的服务器数据，包括但不限于IP地址、网站Cookie中的资料及您要求取用的网页记录；“法律百科”承诺不公开或透露您的密码、手机号码等在本站的非公开信息。除非因会员本人的需要、法律或其他合法程序的要求、服务条款的改变或修订等。
　　为服务用户的目的，“法律百科”可能通过使用您的个人信息，向您提供服务，包括但不限于向您发出活动和服务信息等。
　　同时会员须做到：
　　● 用户名和昵称的注册与使用应符合网络道德，遵守中华人民共和国的相关法律法规。
　　● 用户名和昵称中不能含有威胁、淫秽、漫骂、非法、侵害他人权益等有争议性的文字。
　　● 注册成功后，会员必须保护好自己的帐号和密码，因会员本人泄露而造成的任何损失由会员本人负责。
　　● 不得盗用他人帐号，由此行为造成的后果自负。
　　您的个人信息将在下述情况下部分或全部被披露：
　　● 经您同意，向第三方披露；
　　● 如您是合资格的知识产权投诉人并已提起投诉，应被投诉人要求，向被投诉人披露，以便双方处理可能的权利纠纷；
　　● 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；
　　● 如果您出现违反中国有关法律或者网站政策的情况，需要向第三方披露；
　　● 为提供你所要求的产品和服务，而必须和第三方分享您的个人信息；
　　● 其他本网站根据法律或者网站政策认为合适的披露
　　三、责任说明
　　基于技术和不可预见的原因而导致的服务中断，或者因会员的非法操作而造成的损失，“法律百科”不负责任。会员应当自行承担一切因自身行为而直接或者间接导致的民事或刑事法律责任。
　　四、会员必须做到：
　　1、不得利用本站危害国家安全、泄露国家秘密，不得侵犯国家社会集体的和公民的合法权益，不得利用本站制作、复制和传播下列信息：
　　（1）煽动抗拒、破坏宪法和法律、行政法规实施的；
　　（2）煽动颠覆国家政权，推翻社会主义制度的；
　　（3）煽动分裂国家、破坏国家统一的；
　　（4）煽动民族仇恨、民族歧视，破坏民族团结的；
　　（5）捏造或者歪曲事实，散布谣言，扰乱社会秩序的；
　　（6）宣扬封建迷信、淫秽、色情、赌博、暴力、凶杀、恐怖、教唆犯罪的；
　　（7）公然侮辱他人或者捏造事实诽谤他人的，或者进行其他恶意攻击的；
　　（8）损害国家机关信誉的；
　　（9）其他违反宪法和法律行政法规的；
　　（10）进行商业广告行为的。


　　任何会员在本站发表任何形式的信息，均表明该用户主动将该信息的发表权、汇编权、修改权、信息网络传播权无偿独家转让给“法律百科”运营商。本协议已经构成《著作权法》第二十五条所规定的书面协议，并在用户同意本注册协议时生效，其效力及于用户此后在法律百科发布的任何内容。
　　会员同意并明确了解上述条款，不将已发表于本站的信息，以任何形式发布或授权其它网站（及媒体）使用。
　　同时，“法律百科”保留删除站内各类不符合规定点评而不通知会员的权利：
　　六、免责声明：
　　● “法律百科”是为互联网用户提供信息存储空间的互联网服务提供者，对于任何包含、经由或连接、下载或从任何与有关本网站所获得的任何内容、信息或广告，不声明或保证其正确性或可靠性；并且对于用户经本网站上的内容、广告、展示而购买、取得的任何产品、信息或资料，“法律百科”不负保证责任。用户自行负担使用本网站的风险。
　　● “法律百科”有权但无义务，改善或更正本网站任何部分之任何疏漏、错误。
　　● 本站内相关信息内容仅代表发布者的个人观点，并不表示本站赞同其观点或证实其描述，本站不承担由此引发的法律责任。
            </pre>
		</div>
        </el-container>
        <el-dialog
            title="我的备注"
            :visible.sync="addVisible"
            width="30%">
            <el-input
                type="textarea"
                :rows="10"
                :maxRows="10"
                placeholder="请输入内容"
                v-model="detail.mark"
                resize='none'>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false;detail.mark = ''">取 消</el-button>
                <el-button type="primary" @click="addVisible = false" >立即添加</el-button>
            </span>
        </el-dialog>
        <el-dialog
            title="我的备注"
            :visible.sync="dialogVisible"
            width="30%">
            <span class='sub-title'>更新时间：{{detail.updateTime}}</span>
            <el-input
                type="textarea"
                :rows="10"
                :maxRows="10"
                placeholder="请输入内容"
                v-model="mark"
                :disabled="disabled"
                resize='none'>
            </el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;disabled= true">取 消</el-button>
                <el-button type="primary" @click="re_edit" v-if='disabled'>再次编辑</el-button>
                <el-button type="primary" @click="dialogVisible = false;disabled = true" v-else>确定修改</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import scrollTop from '../../components/scroll-top'
import echarts from 'echarts'
import api from '../../api/api'
export default {
    data() {
        return {
            mark:'',
            dialogVisible:false,
            addVisible:false,
            disabled:true,
            detail:{}
        }
    },
    components:{
        scrollTop
    },
    created() {
        this.get_data()

    },
    mounted() {
        // this.init()
    },
    methods: {
        async get_data() {
            const data = {
                id: this.$route.query.id
            }
            const res = await api.get_reports_detail(data)
            this.detail = res.data
            this.detail.updateTime = this.renderTime(this.detail.updateTime)
            //this.mark = this.detail.mark
        },
        renderTime(date) {
            var dateee = new Date(date).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '') 
        },
        add() {
            this.$prompt('我的备注', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(({ value }) => {
                this.detail.mark = value
                this.$message({
                    type: 'success',
                    message: '备注添加成功'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        re_edit() {
            this.dialogVisible = true
            this.disabled = false 
        }
    },
}
</script>

<style lang="stylus" scoped>
    #wenzhang
        width 100%
        background #ffffff
        padding 20px 
        position relative
        box-sizing border-box
        box-shadow 0px 4px 8px 0px rgba(62,128,195,0.04)
        border-radius 4px 
        img 
            position absolute
            left 0
            top 0
    
    .head{
        width 100%
        height:20px;
        font-size:18px;
        font-weight:400;
        color:rgba(0,0,0,1);
        display: block;
        text-align: center;
        margin 34px 0
    }
    pre{
        white-space: pre-wrap;
        word-wrap: break-word;
        padding-top: 25px;
        width:100%;
        height:100%;
        box-shadow:0px 4px 8px 0px rgba(62,128,195,0.04);
        border-radius:4px;
        font-size 14px
        color #333
        line-height 24px
    }
    .sub-title {
        font-size 14px
        color #999
        margin-bottom 30px
        display block
    }
</style>