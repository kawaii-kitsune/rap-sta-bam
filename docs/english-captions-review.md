# English caption review

Episodes 1–3 have English JSON tracks and YouTube-compatible UTF-8 SRT exports in `public/assets/captions`. English episode pages load the `.en.json` track; Greek pages retain their original caption files.

All 1,763 cues preserve the original start and end times. The translation was drafted with Google Translate, then edited for dialogue, rap slang, artist names, studio terminology, and performance lyrics. 1,211 cues received editorial changes. The Greek source captions were not rewritten. This was a text translation and review, not a full listen-through of the recordings.

The downloadable `english-subtitles.zip` contains the three English SRT files. In YouTube Studio, select English, Upload file, and With timing.

## Lines to check against the recording

| Episode | Cue | Reason |
| --- | --- | --- |
| 001 — Tzimos | 284, 367, 403 | The Greek source includes unclear text; the English track marks it `[unclear]`. |
| 002 — Nesom | 760, 782 | The Greek wording is incomplete or unclear; the English track flags it. |
| 003 — Chozen | 50 | Quoted lyric has unclear Greek wording; translated as supplied. |
| 003 — Chozen | 169 | Confirm the spelling of Add Manson's name. |
| 003 — Chozen | 471 | `ποσέ` is retained as `poché`; confirm the intended reference. |
| 003 — Chozen | 474 | Confirm the YAYO reference in the lyric. |

Episode 4's Greek transcription has completed. Greek and English review drafts are stored locally in `private/captions/drafts/` and excluded from Git. They omit four repeated `AUTHORWAVE` transcription artifacts at the end. The Greek draft needs correction, particularly repeated text around 30:13–30:33, artist names, and the performance lyrics from 44:05. Neither draft is connected to the site player yet.
