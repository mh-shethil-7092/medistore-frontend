export default function ShopPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1>Shop Page</h1>
            <p>Product ID: {params.id}</p>
            <p>Hello</p>
        </div>
    );
}