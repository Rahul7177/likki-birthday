from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageEnhance
import numpy as np, os, math, subprocess, random
from moviepy import ImageClip, CompositeVideoClip, AudioClip, concatenate_videoclips
ROOT=os.path.dirname(os.path.abspath(__file__)); PH=os.path.join(ROOT,'public','photos'); OUT=os.path.join(ROOT,'birthday_film.mp4')
W,H=1280,720; FPS=24
rose=(196,86,101); burg=(136,68,76); cream=(255,250,248); muted=(245,224,224)
serif='/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf'; serif_i='/usr/share/fonts/truetype/dejavu/DejaVuSerif-Italic.ttf'; sans='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
def font(path,size): return ImageFont.truetype(path,size)
def fit_cover(im,w,h):
    iw,ih=im.size; scale=max(w/iw,h/ih); im=im.resize((int(iw*scale),int(ih*scale)),Image.Resampling.LANCZOS); x=(im.width-w)//2; y=(im.height-h)//2; return im.crop((x,y,x+w,y+h))
def title_card(kicker,title,subtitle=''):
    im=Image.new('RGB',(W,H),cream); d=ImageDraw.Draw(im)
    # soft blush central wash
    wash=Image.new('RGBA',(W,H),(0,0,0,0)); wd=ImageDraw.Draw(wash); wd.ellipse((260,70,1020,790),fill=(251,228,227,140)); wash=wash.filter(ImageFilter.GaussianBlur(70)); im=Image.alpha_composite(im.convert('RGBA'),wash).convert('RGB'); d=ImageDraw.Draw(im)
    d.text((W//2,235),kicker.upper(),font=font(sans,18),fill=rose,anchor='mm',stroke_width=0)
    d.text((W//2,326),title,font=font(serif_i,58),fill=burg,anchor='mm')
    if subtitle: d.text((W//2,408),subtitle,font=font(sans,19),fill=(128,107,107),anchor='mm')
    d.text((W//2,625),'♡',font=font(serif,38),fill=rose,anchor='mm')
    return np.array(im)
def photo_frame(path,caption,idx):
    src=Image.open(path).convert('RGB')
    bg=fit_cover(src,W,H).filter(ImageFilter.GaussianBlur(22)); bg=ImageEnhance.Brightness(bg).enhance(.52)
    # fit portrait photo on warm background with natural crop/contain
    maxw,maxh=800,650; scale=min(maxw/src.width,maxh/src.height); fg=src.resize((int(src.width*scale),int(src.height*scale)),Image.Resampling.LANCZOS)
    # slight tone
    fg=ImageEnhance.Color(fg).enhance(.94)
    x=(W-fg.width)//2; y=(H-fg.height)//2-8
    # paper matte and shadow
    shadow=Image.new('RGBA',(W,H),(0,0,0,0)); sd=ImageDraw.Draw(shadow); sd.rounded_rectangle((x-12+5,y-12+7,x+fg.width+12+5,y+fg.height+12+7),radius=3,fill=(0,0,0,100)); shadow=shadow.filter(ImageFilter.GaussianBlur(18)); canvas=Image.alpha_composite(bg.convert('RGBA'),shadow)
    d=ImageDraw.Draw(canvas); d.rectangle((x-12,y-12,x+fg.width+12,y+fg.height+12),fill=(255,250,248,255)); canvas.alpha_composite(fg.convert('RGBA'),(x,y))
    d=ImageDraw.Draw(canvas); d.rectangle((0,0,W,70),fill=(35,24,28,110)); d.text((48,34),'A LITTLE COLLECTION OF MEMORIES',font=font(sans,14),fill=(255,246,244),anchor='lm')
    d.rectangle((0,H-85,W,H),fill=(35,24,28,130)); d.text((W//2,H-53),caption,font=font(serif_i,28),fill=(255,250,248),anchor='mm')
    # corner index
    d.text((W-48,34),f'{idx:02d}',font=font(serif,18),fill=(255,246,244),anchor='mm')
    return np.array(canvas.convert('RGB'))
# Deliberately order the bowling group photo first, then friendship and candid moments.
items=[
 ('1000067362.jpg','Where it all began'),('1000067325.jpg','The little adventures'),('1000067331.jpg','A day by the water'),('1000067337.jpg','That smile'),('1000067326.jpg','The silly moments'),('1000067327.jpg','Together, in the frame'),('1000067340.jpg','A familiar kind of comfort'),('1000067343.jpg','A little dressed up'),('1000067345.jpg','The everyday magic'),('1000067348.jpg','The happy chaos'),('1000067350.jpg','A little tradition'),('1000067352.jpg','A day to remember'),('1000067353.jpg','Cake, of course'),('1000067355.jpg','A favourite kind of evening'),('1000067356.jpg','One for the album'),('1000067357.jpg','The gang'),('1000067358.jpg','Never change this energy'),('1000067359.jpg','In your own little world'),('1000067360.jpg','Just being you')]
clips=[]
def still_clip(arr,dur):
    return ImageClip(arr).with_duration(dur)
clips.append(still_clip(title_card('October 28 · a birthday film','For Likhita, with warmth','Some people make ordinary days beautiful.'),5.0))
clips.append(still_clip(title_card('Chapter one','Where it all began','One ordinary day in Mysore · a game of bowling'),4.2))
for i,(fn,cap) in enumerate(items,1):
    p=os.path.join(PH,fn)
    if os.path.exists(p): clips.append(still_clip(photo_frame(p,cap,i),3.15 if i not in [1,5,13,16] else 3.8))
    if i in [4,8,13,17]:
        t={4:('Chapter two','Your kind of happiness','The smile, the calm, the fun'),8:('Chapter three','A little of the story','More than just pictures'),13:('Chapter four','The things I hope you never forget','May life be kind to you'),17:('One last thing','For all the moments still to come','And I’m glad we have these.') }[i]
        clips.append(still_clip(title_card(*t),3.2))
clips.append(still_clip(title_card('Happy Birthday, Likhita','Stay the beautiful person you are.','I’m really glad our paths crossed. ♡'),6.0))
video=concatenate_videoclips(clips,method='compose')
# Soft synthesized instrumental bed: mellow repeating piano-like notes/chords, no external copyrighted track.
# Use simple harmonic partials with gentle envelopes, intentionally quiet beneath visuals.
dur=video.duration; sr=44100
notes=[(261.63,0),(329.63,.5),(392,1.0),(329.63,1.5),(220,2),(293.66,2.5),(349.23,3),(293.66,3.5),(196,4),(261.63,4.5),(329.63,5),(261.63,5.5),(174.61,6),(261.63,6.5),(311.13,7),(261.63,7.5)]
def audio_frame(t):
    ts=np.array(t,ndmin=1,dtype=float); out=np.zeros(ts.shape,dtype=float)
    # chord bed looping every 8 seconds with slow, smooth envelopes
    for f,start in notes:
        local=(ts-start)%8
        env=np.clip(local/.18,0,1)*np.clip((3.4-local)/.65,0,1)
        env=np.maximum(env,0)
        tone=np.sin(2*np.pi*f*ts)+.35*np.sin(2*np.pi*f*2*ts)+.12*np.sin(2*np.pi*f*3*ts)
        out += .018*env*tone
    # gentle airy pad
    out += .012*np.sin(2*np.pi*110*ts)*(.5+.5*np.sin(2*np.pi*0.08*ts))
    # fade in/out
    out *= np.clip(ts/2,0,1)*np.clip((dur-ts)/3,0,1)
    return out if np.ndim(t) else float(out[0])
audio=AudioClip(audio_frame,duration=dur,fps=sr)
video=video.with_audio(audio)
video.write_videofile(OUT,fps=FPS,codec='libx264',audio_codec='aac',bitrate='3500k',audio_bitrate='160k',preset='medium',threads=4,logger=None)
print('Created',OUT,'duration',round(dur,1),'seconds')
