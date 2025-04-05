#
# For licensing see accompanying LICENSE file.
# Copyright (C) 2024 Apple Inc. All Rights Reserved.
#

import os
import glob
import sys
from moviepy.editor import VideoFileClip, AudioFileClip
from multiprocessing import Pool, cpu_count

os.environ["IMAGEIO_FFMPEG_EXE"] = "ffmpeg"
video_base_dir = sys.argv[1]
audio_base_dir = sys.argv[2]
output_base_dir = sys.argv[3] 

# Function to overlay audio on video
def overlay_audio_on_video(audio_path):
    try:
        # Extract components from audio filename
        filename = os.path.basename(audio_path)
        parts = filename.split("-")
        mp4_file = parts[-2]  # Second-to-last part as mp4 filename (e.g., 00485)
        mp4_file_1 = parts[-1].split("_")[0]

        # Construct video path based on extracted components
        video_path = os.path.join(video_base_dir, mp4_file, f"{mp4_file_1}.mp4")

        # Check if the video file exists before proceeding
        if not os.path.exists(video_path):
            print(f"Video file not found: {video_path}")
            return

        # Load the video and audio clips
        video_clip = VideoFileClip(video_path)
        new_audio_clip = AudioFileClip(audio_path)

        # Set the new audio to the video
        video_with_new_audio = video_clip.set_audio(new_audio_clip)

        # Construct the output path to mirror the video path structure
        output_path = os.path.join(output_base_dir, f"{mp4_file}_{mp4_file_1}.mp4")

        # Ensure the output directory exists
        os.makedirs(os.path.dirname(output_path), exist_ok=True)

        # Write the new video file with the new audio
        video_with_new_audio.write_videofile(
            output_path, codec="libx264", audio_codec="aac"
        )
        print(f"New video saved at {output_path}")

    except Exception as e:
        print(f"Failed to process {audio_path}: {e}")


if __name__ == "__main__":
    # Get all normalized wav files in the specified directory
    audio_files = glob.glob(os.path.join(audio_base_dir, "*_normalized.wav"))
    num_cores = cpu_count()

    # Use multiprocessing to process each audio file in parallel
    with Pool(processes=num_cores) as pool:
        pool.map(overlay_audio_on_video, audio_files)
