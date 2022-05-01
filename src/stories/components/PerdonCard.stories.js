import PersonCard from 'components/PersonCard/PersonCard'

export default {
  title: 'Component/PersonCard',
  component: PersonCard,
}

export const PersonCardTemplate = () => (
  <div style={{ width: 240 }}>
    <PersonCard />
  </div>
)
