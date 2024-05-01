import { Badge, border } from "@chakra-ui/react"

function TypeBadge({ typeName }: { typeName: string }) {
  return (
    <Badge size="xs" bg={`${typeName}.badge`} borderRadius="2xl" paddingX={2}>
      {typeName}
    </Badge>
  )
}

export default TypeBadge