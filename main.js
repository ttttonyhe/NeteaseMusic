var index = new Vue({
    el:'#view',
    data(){
        return {
            items : null,
            loading : true,
            s_search : false,
            spinning : false,
            song : null,
            visible : false,
            confirmLoading : false,
            song_visible : true,
            song_content : false,
            song_src : null
        }
    },
    methods : {
        onSearch : function(key){
            if(key !== ''){
                this.s_search = true;
                this.spinning = true;
                axios.get('https://v1.hitokoto.cn/nm/search/'+key.toString()+'?limit=32')
                .then(response=>{
                    this.items = response.data.result.songs;
                    this.spinning = false;
                })
            }
        },
        showModal(id) {
          this.visible = true;
          axios.get('https://v1.hitokoto.cn/nm/summary/'+id)
          .then(response=>{
              this.song = response.data[id];
              this.song_visible = false;
              this.song_content = true;
              this.song_src = 'https://v1.hitokoto.cn/nm/redirect/music/'+id;
          });
        },
        handleOk(e) {
            this.ModalText = '准备下载';
            this.confirmLoading = true;
            window.open(this.song_src,'_blank',"top=0,left=100,width=400,height=250").location;
            this.visible = false;
            this.confirmLoading = false;
        },
        handleCancel(e) {
            this.visible = false;
            this.song = null;
            this.song_visible = true;
            this.song_content = false;
        }
    
    }
})
