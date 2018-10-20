function getAbsPosition(elem) {
  var docElem = document.documentElement
  var abs = { x: 0, y: 0 }
  if (docElem.getBoundingClientRect) {
    abs.x = elem.getBoundingClientRect().left
    abs.y = elem.getBoundingClientRect().top
    abs.x += window.screenLeft + docElem.scrollLeft - docElem.clientLeft
    abs.y += window.screenTop + docElem.scrollTop - docElem.clientTop
  } else {
    while (elem != document.body)  {
      abs.x += elem.offsetLeft
      abs.y += elem.offsetTop
      elem = elem.offsetParent
    }
    abs.x += window.screenLeft + document.body.clientLeft - document.body.scrollLeft
    abs.y += window.screenTop + document.body.clientTop - document.body.scrollTop
  }
  return abs
}

function printAttr(elem) {
  var elem = elem
  var attributes = elem.attributes
  for (key in attributes) {
    if (attributes.hasOwnProperty(key)) {
      console.log(key, attributes[key])
    }
  }
}

printAttr(document.getElementById('content')[0])
printAttr(document.getElementById('innerContent')[0])
