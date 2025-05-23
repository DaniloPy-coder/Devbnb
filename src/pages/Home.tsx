import Item from "../components/Item"

const Home = () => {
    return (
        <section>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] mx-auto max-w-7xl p-8 gap-8">
                <Item />
            </div>
        </section>
    )
}

export default Home
