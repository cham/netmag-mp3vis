'use strict';
function AudioAnalyser(options){
    this.bufferWidth = options.bufferWidth;

    this.loadUrl(options.src);
}

AudioAnalyser.prototype.loadUrl = function loadUrl(url){
    var xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';

    xhr.onload = this.onLoadAudio.bind(this, xhr);
    xhr.send();
};

AudioAnalyser.prototype.getFrequencyData = function getFrequencyData(){
    var frequencyBuffer = new Uint8Array(this.bufferWidth);

    if(this.analyser){
        this.analyser.getByteFrequencyData(frequencyBuffer);
    }

    return frequencyBuffer;
};

AudioAnalyser.prototype.onLoadAudio = function onLoadAudio(xhr){
    var context = new AudioContext();

    var analyser = context.createAnalyser();
    analyser.fftSize = this.bufferWidth;
    analyser.connect(context.destination);
    this.analyser = analyser;

    var source = context.createBufferSource();
    source.connect(analyser);

    context.decodeAudioData(xhr.response, function(buffer){
        source.buffer = buffer;
        source.start(0);
    });
};
