init();
function init() {

    localStorage.current = 0;
    var audio = $('#audio');
    var playlist = ["/music/musica_lg/musica1.mp3", "/music/musica_lg/musica2.mp3", "/music/musica_lg/musica3.mp3", "/music/musica_lg/musica4.mpg","/music/musica_lg/musica5.mpg"];
    var imagen = ["/music/album/imagen1.jpg", "/music/album/imagen2.jpg", "/music/album/imagen3.jpg", "/music/album/imagen4.jpg","/music/album/imagen5.jpg"];
    var artist = ["System of a Down", "Audioslave", "Queen", "Guns N' Roses","Maroon 5"];
    var songName = ["Chop suey ", "Like a Stone ", "We Will Rock You ", "Sweet child o' mine","This love "];
    var len = playlist.length;
    audio[0].volume = .10;
    //audio[0].play();
    audio[0].addEventListener('ended', function (e) {
        var c = Number(localStorage.current);
        var link = playlist[0];
        var art = artist[0];
        var nam = songName[0];
        c++;
        if (c == len) {
            c = 0;
        } else {
            link = playlist[c];
            art = artist[c];
            nam = songName[c];
        }
        localStorage.current = c;
        run(link, audio[0], art, nam);
    });
}
function run(link, player, artist, songName) {
    console.log(artist, songName);
    player.src = link;
    document.getElementById("playerArtist").innerHTML = artist;
    document.getElementById("playerSong").innerHTML = songName;
    player.load();
    player.play();
}