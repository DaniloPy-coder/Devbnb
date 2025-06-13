import React from "react";

const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="https://q-xx.bstatic.com/xdata/images/hotel/max500/483096877.jpg?k=1f012b01f176cd40d9051fd0459f00d850770d1435752ea9feb9b473ac6a82cf&o="
        alt="acomodacao"
        className="aspect-square rounded-2xl object-cover"
      />

      <div>
        <h3 className="text-xl font-semibold">Cabo Frio, Rio de Janeiro</h3>
        <p className="truncate text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora
          magni quam sequi praesentium maiores. Ratione corrupti sed possimus ut
          quidem impedit ad quis, quibusdam facilis voluptatem. Fugit
          perspiciatis aspernatur molestiae?
        </p>
      </div>
      <p>
        <span className="font-semibold">R$ 550</span> por noite
      </p>
    </a>
  );
};

export default Item;
