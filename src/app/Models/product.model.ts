

export interface ProductModel{
    _id: String;
    prodName: String;
    brand: String;
    gender: String;
    description: String;
    // imageSrc: File;
    imageSrc: String;
    imageAlt: String;
    size: String;
    price: Number;
    // sizes: {size: String; price: Number;}[];
    product_brand: any;
    // brandName: String;
}