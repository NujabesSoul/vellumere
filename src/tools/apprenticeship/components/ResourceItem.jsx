export default function ResourceItem({ resource }) {
  return (
    <div className="resource-item">
      <span className="resource-type">{resource.type}</span>
      <span className="resource-name">{resource.name}</span>
      {resource.cost && (
        <span className="resource-cost">{resource.cost}</span>
      )}
      {resource.why && (
        <p className="resource-why">{resource.why}</p>
      )}
    </div>
  )
}
