// https://github.com/atomdeniz/nodejs-mp4-to-hls/blob/master/index.js
const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');
ffmpeg.setFfmpegPath(ffmpegInstaller.path);
const fs = require('fs');

const OUTPUT = './public/course-data/'

// filename = abc.mp4 hoac .avi
// Calling this when someone's upload video!
async function f(filename, desired_path) {
    // let desired_path = filename.split('.').shift();
    filename = './videos/' + filename;

    if (!fs.existsSync(OUTPUT + desired_path)) {
        fs.mkdirSync(OUTPUT + desired_path); // Not generated
    } else {
        return; // Skip
    }

    function callback() { // do something when encoding is done 
        fs.writeFile(OUTPUT + desired_path + "/index.m3u8", 
            '#EXTM3U\n#EXT-X-VERSION:3\n#EXT-X-STREAM-INF:BANDWIDTH=2800000,RESOLUTION=1280x720\n720p.m3u8', 
            function (err) {
                if (err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
        })
    }
    // \n#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=842x480\n480p.m3u8
    // \n#EXT-X-STREAM-INF:BANDWIDTH=800000,RESOLUTION=640x360\n360p.m3u8

    // ffmpeg(filename).addOptions([ //360
    //     '-profile:v main',
    //     '-vf scale=w=640:h=360:force_original_aspect_ratio=decrease',
    //     '-c:a aac',
    //     '-ar 48000',
    //     '-b:a 96k',
    //     '-c:v h264',
    //     '-crf 20',
    //     '-g 48',
    //     '-keyint_min 48',
    //     '-sc_threshold 0',
    //     '-b:v 800k',
    //     '-maxrate 856k',
    //     '-bufsize 1200k',
    //     '-hls_time 10',
    //     '-hls_segment_filename videos/360p_%03d.ts',
    //     '-hls_playlist_type vod',
    //     '-f hls'
    // ]).output(OUTPUT + real_filename + '/360p.m3u8').run()

    // ffmpeg(filename).addOptions([ //480
    //     '-profile:v main',
    //     '-vf scale=w=842:h=480:force_original_aspect_ratio=decrease',
    //     '-c:a aac',
    //     '-ar 48000',
    //     '-b:a 128k',
    //     '-c:v h264',
    //     '-crf 20',
    //     '-g 48',
    //     '-keyint_min 48',
    //     '-sc_threshold 0',
    //     '-b:v 1400k',
    //     '-maxrate 1498k',
    //     '-bufsize 2100k',
    //     '-hls_time 10',
    //     `-hls_segment_filename ${OUTPUT + desired_path}/480p_%03d.ts`,
    //     '-hls_playlist_type vod',
    //     '-f hls'
    // ]).output(OUTPUT + desired_path + '/480p.m3u8').run()

    ffmpeg(filename).addOptions([ //720
        '-profile:v main',
        '-vf scale=w=1280:h=720:force_original_aspect_ratio=decrease',
        '-c:a aac',
        '-ar 48000',
        '-b:a 128k',
        '-c:v h264',
        '-crf 20',
        '-g 48',
        '-keyint_min 48',
        '-sc_threshold 0',
        '-b:v 2800k',
        '-maxrate 2996k',
        '-bufsize 4200k',
        '-hls_time 10', 
        `-hls_segment_filename ${OUTPUT + desired_path}/720p_%03d.ts`,
        '-hls_playlist_type vod',
        '-f hls' 
    ]).output(OUTPUT + desired_path + '/720p.m3u8').on('end', callback).run()
}

exports.converter = f;