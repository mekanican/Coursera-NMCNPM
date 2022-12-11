from flask import Flask, request
from gen_cert import gen_image_cert

app = Flask(__name__)

# Example payload /?sname=Nghia&cname=abc&lname=1 for raw base64 string
# Example payload /?sname=Nghia&cname=abc&lname=1&o=1 for image with html tag


@app.route("/")
def main_route():
    student_name = request.args['sname'].strip()
    course_name = request.args['cname'].strip()
    lecturer_name = request.args['lname'].strip()
    
    option = request.args.get('o')
    if option is not None:
        return b"<img src=\"data:image/png;base64," + gen_image_cert(student_name, course_name, lecturer_name) + b"\"/>"
    return gen_image_cert(student_name, course_name, lecturer_name)

if __name__ == "__main__":
    app.run(host = "0.0.0.0", port =1234)
