/**
 * Listens to audio input volume and displays a volume meter with results.
 *
 * @file Update of https://github.com/cwilso/volume-meter/blob/master/volume-meter.js.
 * @author Kathryn DiPippo, Chris Wilson 2014
 */

let audioContext = null
let meter = null
let canvasContext = null
const WIDTH = 200
const HEIGHT = 50
let mediaStreamSource = null

/**
 * AudioMeter constructor that wraps Navigator functionality to measure audio input volume.
 * @param {AudioContext} audioContext - Current AudioContext in use.
 * @param {number} [clipLevel=0.98] - Level where audio clipping occurs on a scale of 0 to 1.
 * @param {number} [averaging=0.95] - Audio smoothing on a scale of 0 to 1.
 * @param {number} [clipLag=750] - Duration in ms for how long "clipping" indicator shows.
 * @returns {ScriptProcessorNode} Resulting configured processor.
 */
function createAudioMeter (audioContext, clipLevel = 0.98, averaging = 0.95, clipLag = 750) {
  // TODO - createScriptProcessor() is deprecated https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/createScriptProcessor
  const processor = audioContext.createScriptProcessor(512)
  processor.onaudioprocess = volumeAudioProcess
  processor.clipping = false
  processor.lastClip = 0
  processor.volume = 0
  processor.clipLevel = clipLevel
  processor.averaging = averaging
  processor.clipLag = clipLag

  // This will have no effect, since we don't copy the input to the output
  //   but works around a current Chrome bug.
  processor.connect(audioContext.destination)

  processor.checkClipping = function () {
    if (!this.clipping) { return false }
    if ((this.lastClip + this.clipLag) < window.performance.now()) { this.clipping = false }
    return this.clipping
  }

  processor.shutdown = function () {
    this.disconnect()
    this.onaudioprocess = null
  }

  return processor
}

/**
 * Callback for the volume meter onaudioprocess to process and set current volume.
 * @param {audioProcessingEvent} event - Audio processing event.
 * @returns {void}
 */
function volumeAudioProcess (event) {
  const buf = event.inputBuffer.getChannelData(0)
  const bufLength = buf.length
  let sum = 0
  let x

  // Do a root-mean-square on the samples: sum up the squares...
  for (let i = 0; i < bufLength; i++) {
    x = buf[i]
    if (Math.abs(x) >= this.clipLevel) {
      this.clipping = true
      this.lastClip = window.performance.now()
    }
    sum += x * x
  }

  // ...Then take the square root of the sum.
  const rms = Math.sqrt(sum / bufLength)

  // Now smooth this out with the averaging factor applied
  //   to the previous sample - take the max here because we
  //   want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging)
}

/**
 * Error callback that alerts when stream generation failed.
 * @returns {void}
 */
function didntGetStream () {
  alert('Stream generation failed.')
}

/**
 * Success callback that starts the process of pulling for audio volume.
 * @param {MediaStream} stream - MediaStream object that contains the media stream
 * @returns {void}
 */
function gotStream (stream) {
  // Create an AudioNode from the stream.
  mediaStreamSource = audioContext.createMediaStreamSource(stream)

  // Create a new volume meter and connect it.
  meter = createAudioMeter(audioContext)
  mediaStreamSource.connect(meter)

  // Kick off the visual updating.
  drawLoop()
}

/**
 * Recursively updates the #meter canvas object with the new width of the current polled sound volume.
 * @returns {void}
 */
function drawLoop () {
  // Clear the background.
  canvasContext.clearRect(0, 0, WIDTH, HEIGHT)

  // Check if we're currently clipping.
  if (meter.checkClipping()) { canvasContext.fillStyle = 'red' } else { canvasContext.fillStyle = 'green' }

  // Draw a bar based on the current volume.
  canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT)
  updateSpamSpeed(meter.volume * 100) // eslint-disable-line no-undef

  // Set up the next visual callback.
  window.requestAnimationFrame(drawLoop)
}

/**
 * Initialize the volume meter and #meter canvas.
 * @returns {void}
 */
function startListening () { // eslint-disable-line no-unused-vars
  // Grab our canvas.
  canvasContext = document.getElementById('meter').getContext('2d')

  // Monkeypatch Web Audio.
  window.AudioContext = window.AudioContext || window.webkitAudioContext

  // Grab an audio context.
  audioContext = new AudioContext()

  // Attempt to get audio input.
  try {
    // Monkeypatch getUserMedia.
    // TODO - Navigator is deprecated: https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
    //  -> this should be https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia

    // Ask for an audio input.
    navigator.getUserMedia({
      audio: {
        mandatory: {
          googEchoCancellation: 'false',
          googAutoGainControl: 'false',
          googNoiseSuppression: 'false',
          googHighpassFilter: 'false'
        },
        optional: []
      }
    }, gotStream, didntGetStream)
  } catch (e) {
    alert('getUserMedia threw exception :' + e)
  }
}

/**
 * Shuts down the volume meter.
 * @returns {void}
 */
function stopListening () { // eslint-disable-line no-unused-vars
  meter.shutdown()
}
