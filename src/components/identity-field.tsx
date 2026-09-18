import Image from "next/image";

export function IdentityField() {
  return (
    <figure className="identity-field" aria-label="Ahmad Hassan, a portrait formed from particles">
      <div className="portrait-fallback">
        <Image src="/portraits/ahmad-particle-transparent-v1.png" alt="Ahmad Hassan, rendered as a cyan and violet triangular particle portrait" fill sizes="(max-width: 850px) 100vw, 55vw" preload />
      </div>
      <figcaption className="field-caption"><span className="field-marker" /> HUMAN AT THE CORE <span className="caption-separator">/</span> INTELLIGENCE IN MOTION</figcaption>
    </figure>
  );
}
