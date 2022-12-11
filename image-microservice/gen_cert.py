from PIL import Image, ImageDraw, ImageFont
import io
import base64
def gen_image_cert(student_name, course_name, lecturer_name):
    base = Image.open("template/cert.png")
    fnt1 = ImageFont.truetype("font/PinyonScript-Regular.ttf", 192)
    fnt2 = ImageFont.truetype("font/Garet-Book.ttf", 30)
    fnt3 = ImageFont.truetype("font/Garet-Book.ttf", 27)
    context = ImageDraw.Draw(base)
    
    w, h = base.size
    
    pos1 = (1000, 630)
    pos2 = (1000, 830)
    pos3 = (600, 1120)
    
    context.text(pos1, student_name, font=fnt1, fill=(0, 0, 0), anchor='mm')
    context.text(pos2, "For completing the \"%s\" courses" % (course_name), font=fnt2, fill=(0, 0, 0), anchor='mm')
    context.text(pos3, lecturer_name, font=fnt3, fill=(0, 0, 0), anchor='mm')

    buffer = io.BytesIO()

    base.save(buffer, format="PNG")

    return base64.b64encode(buffer.getvalue())


# print(len(gen_image_cert('Nguyễn Văn A','Database Management','Nguyễn Văn B')))
