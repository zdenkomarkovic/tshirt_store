import Image from "@/node_modules/next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className=" background-light900_dark200 light-border border-t p-3 shadow-light-300 dark:shadow-none ">
      <div className="container">
        <div>
          <h6 className="h3-bold">Budi u toku!</h6>
          <p className="body-regular">
            Saznaj pre svih o aktuelnim sniženjima i najnovijim modelima
            gejmerske opreme. Sve što treba da uradiš je da se prijaviš na naš
            Newsletter!
          </p>
          <input />
          <button>Subscribe</button>
        </div>
        <div className="flex-between">
          <div>
            <h6 className=" h3-bold">Informacije</h6>
            <p className="body-regular">Informacije o dostavi</p>
            <p className="body-regular">Uslovi korišćenja</p>
            <p className="body-regular">Politika privatnosti</p>
            <p className="body-regular">Reklamacije</p>
            <p className="body-regular">Otkazivanje porudžbine</p>
          </div>
          <div>
            <h6 className=" h3-bold">Kontakt</h6>
            <p className="body-regular">telefon</p>
            <p className="body-regular">mail</p>
            <p className="body-regular">Radno vreme korisnicke podrske</p>
            <p className="body-regular">Ponedeljak - Petak: 08h - 20h</p>
            <p className="body-regular">Subota: 08h - 16h</p>
            <p className="body-regular">Nedelja: Neradni dan</p>
          </div>
          <div>
            <h6 className=" h3-bold">Pratite nas</h6>
            <div className="flex-between">
              <Image src="/t-shirt.svg" width={25} height={25} alt="facebook" />
              <Image
                src="/t-shirt.svg"
                width={25}
                height={25}
                alt="instagram"
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h6 className=" h3-bold">Partneri</h6>
            <p className="body-regular">Prijavi se kao partner</p>
            <p className="body-regular">Prednosti poslovanja na Manikamu</p>
            <p className="body-regular">
              Opšti uslovi poslovanja Manikama za trgovce
            </p>
          </div>
        </div>
        <p className="body-regular py-3">
          © 2020-2023. Sva prava zadržana. Opšti uslovi kupovine. Politika
          privatnosti. Uputstvo za onlajn kupovinu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
