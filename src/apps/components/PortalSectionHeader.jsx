const PortalSectionHeader = ({title, description, breadcrumb = 'Inicio'}) => (
  <section className='portal-section-header'>
    <div className='portal-section-header__breadcrumbs'>
      <span>{breadcrumb}</span>
      <span aria-hidden='true'>/</span>
      <span>{title}</span>
    </div>
    <h1>{title}</h1>
    <p>{description}</p>
  </section>
)

export {PortalSectionHeader}
