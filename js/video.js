(function(){

    var d = document,
        strType = typeof '',
        defaultSelector = '.insert-video';
  
    function each(obj,callback) {
      var length = obj.length,
          i = 0;
  
      for ( ; i < length; i++ ) {
        if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) { break; }
      }
    }
  
    function createVideo(vidAttributes){
      var video = d.createElement('video'),
          sources = vidAttributes.sources;
  
      if ( !sources || vidAttributes.src ) { return false; }
      delete vidAttributes.sources;
  
      for (var attr in vidAttributes) { video.setAttribute(attr,vidAttributes[attr]); }
  
      sources = JSON.parse(sources);
  
      each(sources,function(){
        var source = d.createElement('source');
        for (var attr in this) { source.setAttribute(attr,this[attr]); }
        video.appendChild(source);
      });
  
      return video;
    }
  
  
    function insertVideos(selector,opts){
  
      if ( arguments.length === 1 ) {
        opts = selector || {};
        selector = defaultSelector;
      } else {
        opts = opts || {};
        selector = selector || defaultSelector;
      }
  
      var elems = (
            selector.nodeType ? [selector] :
            typeof selector === strType ? d.querySelectorAll(selector) : selector
          ),
          videos = [];
  
      if ( !elems ) { return false; }
  
      each(elems,function(i,elem){
  
        if ( elem && elem.className.indexOf(' insert-video--done') < 0 ) {
  
          var dataAttr = elem.dataset || false,
              attr, video;
  
          if ( !dataAttr ) {
            attr = elem.attributes;
  
            each(attr,function(i,el){
              var attrName = this.name.replace('data-','');
              if ( attrName.length < this.name.length ) {
                dataAttr[attrName] = this.value;
              }
            });
  
          }
  
          if ( opts.condition !== false ) {
            video = createVideo(dataAttr);
          }
  
          if ( video ) {
            videos.push(video);
            elem.innerHTML = '';
            elem.className += ' insert-video--done';
            elem.appendChild(video);
          } else {
            elem.className += ' insert-video--fallback';
            elem.innerHTML = ( dataAttr.fallback ? dataAttr.fallback : opts.fallback ? opts.fallback : dataAttr.poster ? '<img src="' + dataAttr.poster + '" />' : '' );
          }
  
  
        }
      });
  
      return videos;
    }
  
    window.insertVideos = insertVideos;
  
  }());
  
  insertVideos({
    condition: Modernizr.video
  });
  
  insertVideos('.fail-video',{
    condition: false
  })