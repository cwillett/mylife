function formatDate(date){
  var year = date.getYear()
  if(year < 1900){
    year += 1900
  }
  var month = date.getMonth()+1
  var day = date.getDate()
  var hour = date.getHours()
  var minutes = date.getMinutes()
  return month + '/' + day + '/' + year + ' ' + hour + ':' + minutes
}

function loadEntries(url,id){
  var blogDiv = document.getElementById(id)
  feednami.load(url,function(res){
    blogDiv.removeChild(blogDiv.querySelector('.loading'))
    var entries = res.feed.entries
    var added = 0;
    for(var i = 0; i < entries.length && added < 10; i++){
      var entry = entries[i]
      if(entry.title.indexOf('PR:') == -1){
        added++
        var div = document.createElement('div')
        div.setAttribute('class','entry')
        div.innerHTML = '<p style="padding-bottom:10px">'+formatDate(new Date(entry.pubdate_ms))+'<br><a href="'+entry.link+'" target="_blank">'+entry.title+'</a><br>'+entry.summary+'</p>'
        blogDiv.appendChild(div)
      }
    }
  })
}