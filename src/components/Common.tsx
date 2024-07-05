import styled from "styled-components"
import {green} from "../styles/colors"
import {zones} from "../data/zones"
import Zone from "./Zone"

const StyledCommon = styled.div`
  //background: olive;
  border: 1px solid ${green[700]};
  flex: 1 0 0;
  //font-size: 1.8rem;
  //min-width: 15rem;
  margin: 0.2rem;
  //padding: 0.3rem 0.5rem;
`

const Common = () => {
  return (
    <StyledCommon>
      {
        zones.filter(zone => zone.common)
          .map((zone) =>
          <Zone
            {...zone}
            key={zone.id}
          />)
      }
    </StyledCommon>
  )
}

export default Common
