# Visatronic: A Multimodal Decoder-Only Model for Speech Synthesis

This repository accompanies the research paper **[Visatronic: A Multimodal Decoder-Only Model for Speech Synthesis](https://arxiv.org/abs/2411.17690)** by *Gupta, Akshita, and Likhomanenko, Tatiana and Yang, Karren, and Bai, He and Aldeneh, Zakaria and Jaitly, Navdeep* on speech generation from text and video.

## Abstract

The rapid progress of foundation models and large language models (LLMs) has fueled significantly improvement in the capabilities of machine learning systems that benefit from mutlimodal input data. However, existing multimodal models are predominantly built on top of pre-trained LLMs, which can limit accurate modeling of temporal dependencies across other modalities and thus limit the model’s ability to jointly process and leverage multimodal inputs. To specifically investigate the alignment of text, video, and speech modalities in LLM-style (decoder-only) models, we consider a simplified multimodal generation task, Video-Text to Speech (VTTS): speech generation conditioned on both its corresponding text and video of talking people. The ultimate goal is to generate speech that not only follows the text but also aligns temporally with the video and is consistent with the facial expressions. In this paper, we first introduce Visatronic, a unified multimodal decoder-only transformer model that adopts an LLM-style architecture to embed visual, textual, and speech inputs into a shared subspace, treating all modalities as temporally aligned token streams. Next, we carefully explore different token mixing strategies to understand the best way to propagate information from the steps where video and text conditioning is input to the steps where the audio is generated. We extensively evaluate Visatronic on the challenging VoxCeleb2 dataset and demonstrate zero-shot generalization to LRS3, where Visatronic, trained on VoxCeleb2, achieves a 4.5% WER, outperforming prior SOTA methods trained only on LRS3, which report a 21.4% WER. This highlights significant gains across objective metrics, such as word error rate and phoneme-level synchronization, and subjective assessments of naturalness and expressiveness. Additionally, we propose a new objective metric, TimeSync, specifically designed to measure phoneme-level temporal alignment between generated and reference speech, further ensuring synchronization quality.

<p align="center">
  <a href="./assets/overview.png">
    <img src="./assets/overview.png" alt="Description" width="500">
  </a>
</p>


## Generated Samples

The repository provides examples of the generated speech for models trained on [VoxCeleb2 dataset](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/vox2.html):
we show both success and failure cases. The samples can be played [here](https://apple.github.io/visatronic-demo/).

To overlay generated speech with original speakers' video, please follow:
- download VoxCeleb2 data from [here](https://www.robots.ox.ac.uk/~vgg/data/voxceleb/vox2.html)
- install dependencies
```bash
apt-get install ffmpeg
pip install moviepy
```
- run script
```bash
# PATH_TO_SPEECH_FOLDER - e.g. "audio_samples/success_cases/VTTS_VT_ordered"
python run_speech_overlap_video.py [PATH_TO_VOXCELEB2_VIDEO_DIR] [PATH_TO_SPEECH_FOLDER] [OUTPUT_DIR]
```


## License

- Repository is released under [LICENSE](LICENSE). 
- All generated speech samples provided here are licensed under [LICENSE-speech-samples.md](LICENSE-speech-samples.md).


## Citations

```
@article{gupta2024visatronic,
  title={Visatronic: A Multimodal Decoder-Only Model for Speech Synthesis},
  author={Gupta, Akshita, and Likhomanenko, Tatiana and Yang, Karren, and Bai, He and Aldeneh, Zakaria and Jaitly, Navdeep},
  journal={arXiv preprint arXiv:2411.17690},
  year={2024}
}
```
