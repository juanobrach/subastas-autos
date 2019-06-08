import React from 'react';

import { Section, Container } from '@components/global';

import FaqItem from '@common/FaqItem';

const FAQS = [
  {
    title: '¿Qué es Subastasautos.com?',
    content: () => (
      <>
     Es una empresa que llegó a Argentina a revolucionar la forma de vender autos usados, transformándolo en un proceso rápido, seguro y sin complicaciones. En Subastasautos.com podes tasar tu auto, agendar una inspección y cobrarlo si decidís aceptar la oferta
      </>
    ),
  },
  {
    title: '¿Cómo funciona?',
    content: () => (
      <>
       Lo primero que tenes que hacer es ingresar los datos de tu auto en el formulario de Subastasautos.com. Una vez que obtenes la tasación, agenda en nuestro sitio una inspección para que evaluemos el estado de tu vehículo. Hecho el diagnóstico, te comunicamos la oferta final y, si la aceptas, recibirás tu dinero.
      </>
    ),
  },
  {
    title: '¿En qué ciudades están presentes?',
    content: () => (
      <>
      Nuestro punto de isnpección se halla ubicado en Norcenter. Podés encontrar la dirección exacta Donde estamos
      </>
    ),
  },
  {
    title: '¿Qué tipo de vehículos compran?',
    content: () => (
      <>
        En Vendetuauto.com.ar compramos todo tipo de autos, incluyendo suv, sedán, hatchback, y camionetas. Encontrá tu modelo en nuestro formulario aquí.
      </>
    ),
  }
];

const Faq = () => (
  <Section id="preguntas-frecuentes">
    <Container>
      <h1 style={{ marginBottom: 40, color: 'black' }}>Preguntas Frecuentes</h1>
      <div>
        {FAQS.map(( { title, content }) => (
          <FaqItem title={title} key={title}>
            {content()}
          </FaqItem>
        ))}
      </div>
    </Container>
  </Section>
);

export default Faq;
