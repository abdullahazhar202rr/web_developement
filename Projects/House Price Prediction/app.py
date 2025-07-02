from flask import Flask,render_template,request
import pickle
import numpy as np
app=Flask(__name__)

# with open('models/house_price_model.pkl', 'rb') as f:
#     model = pickle.load(f)

model=pickle.load(open('models/house_price_model.pkl', 'rb'))

@app.route('/', methods=['GET', 'POST'])
def prediction():
    price = None  

    if request.method == 'POST':
        sqft_living = float(request.form['sqft_living'])
        bedrooms = int(request.form['bedrooms'])
        bathrooms = float(request.form['bathrooms'])
        condition = int(request.form['condition'])
        yr_built = int(request.form['yr_built'])
        renovated = int(request.form['renovated'])
        zipcode = int(request.form['zipcode'])

        input_data = np.array([[sqft_living, bedrooms, condition, bathrooms, yr_built, renovated, zipcode]])
        prediction = model.predict(input_data)
        price = np.expm1(prediction[0])

    return render_template('index.html', price=price)

if __name__=='__main__':
    app.run(debug=True)
