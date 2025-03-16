import streamlit as sl
from PyPDF2 import PdfReader
from docx import Document
import io
sl.sidebar.image("https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/2048px-PDF_file_icon.svg.png", width=40)
sl.sidebar.image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzLVd_75bUOFNTyjmd8qIq8x4n7dY6SSQJUO7ExgdCkILdXUfRoeL4jCw&s", caption="👤 **Abdullah Azhar**", width=130)


sl.sidebar.markdown("### 🔧 PDF to DOCX Converter\n💡 My first Streamlit app!")
sl.sidebar.text("⚙️ Built with PyPDF2, io, and docx libraries")
sl.sidebar.select_slider("⭐ Rate this app", ["Worst", "Bad", "Not Bad", "Good", "Best"])
sl.header("📤 Upload your PDF")
uploaded_file= sl.file_uploader("Upload", type=["pdf"])
if uploaded_file is not None:
    try:
        pdf=PdfReader(uploaded_file)
        sl.success("File uploaded successfully")
        sl.write(f"📄 Number of Pages: {len(pdf.pages)}")

        doc=Document()
        for page in pdf.pages:
            text= page.extract_text()
            if text:
                doc.add_paragraph(text)

        word_io= io.BytesIO()
        doc.save(word_io)
        word_io.seek(0)

        sl.header(" 📥 Download your converted Docx")
        sl.download_button(
            label=" ⬇️ Download docx",
            data=word_io,
            file_name="converted_document.docx",
            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        )
    except Exception as e:
        sl.error(f"Error processing the PDF: {e}")