const Item = () => {
    return (
        <a href="/" className="flex flex-col gap-2">
            <img src="https://media.istockphoto.com/id/1050564510/pt/foto/3d-rendering-beautiful-luxury-bedroom-suite-in-hotel-with-tv.jpg?s=612x612&w=is&k=20&c=HIkmp6-AsYX_lJbb8Iq464V9sqJYFqvLxKPJPC8Rpd0=" alt="foto da acomodacao" className="aspect-square object-cover rounded-2xl" />
            <div>
                <h3 className="text-xl font-semibold">Cabo Frio, Rio de Janeiro</h3>
                <p className="truncate text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et nemo nobis enim quidem cupiditate ea quod excepturi eligendi animi? Quibusdam debitis ipsam adipisci hic dicta cupiditate aspernatur saepe tenetur.</p>
                <p><span className="font-semibold">R$ 550</span> por noite</p>
            </div>
        </a>
    )
}

export default Item
