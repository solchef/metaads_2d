function shortString(s: string | string[], l: number, reverse: boolean) {
  var stop_chars = [' ', '/', '&']
  var acceptable_shortness = l * 0.8 // When to start looking for stop characters
  var reverse = typeof reverse != 'undefined' ? reverse : false
  var s = reverse ? s.split('').reverse().join('') : s
  var short_s = ''

  for (var i = 0; i < l - 1; i++) {
    short_s += s[i]
    if (i >= acceptable_shortness && stop_chars.indexOf(s[i]) >= 0) {
      break
    }
  }
  if (reverse) {
    return short_s.split('').reverse().join('')
  }
  return short_s
}

export function shortUrl(url: string, l: number) {
  var l = typeof l != 'undefined' ? l : 50
  var chunk_l = l / 2
  if(url){
    var url = url.replace('http://', '').replace('https://', '')
 

  if (url.length <= l) {
    return url
  }

  var start_chunk = shortString(url, chunk_l, false)
  var end_chunk = shortString(url, chunk_l, true)
  return start_chunk + '..' + end_chunk
}else{
  return ''
}
}

export const findLand = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x: number,
  y: number
) => {
  if (x > x1 && x < x2 && y > y1 && y < y2) return true

  return false
}

export const verifyIsAllowed = (pos: number) => {
  let y = Number(pos) % 1000
  let x = Math.ceil(Number(pos) / 1000)
  let found = false

  const quadmints = [
    [0, 0],
    [0, 750],
    [800, 0],
    [800, 750],
    [400, 375],
  ]

  quadmints.forEach((quad) => {
    found = findLand(quad[1], quad[0], quad[1] + 250, quad[0] + 200, x, y)
  })

  return found
}

export const splitIndividualImages = async (
  imageObject: string,
  width: number,
  height: number
) => {
  var imagePieces = []
  for (var x = 0; x < width; ++x) {
    for (var y = 0; y < height; ++y) {
      var canvas = document.createElement('canvas')
      canvas.width = 1
      canvas.height = 1
      var context = canvas.getContext('2d')
      var imageObj1 = new Image()
      imageObj1.setAttribute('crossorigin', 'anonymous')
      imageObj1.src = imageObject
      context.drawImage(
        imageObj1,
        x * 1,
        y * 1,
        1,
        1,
        0,
        0,
        canvas.width,
        canvas.height
      )
      imagePieces.push(canvas.toDataURL('image/png'))
    }
  }

  return imagePieces
}
