import styled from "styled-components"
import {green} from "../styles/colors"
import {commonId} from "../data/players"
import {commonZones} from "../data/zones"
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
        commonZones.map((zone) =>
          <Zone
            key={zone.id}
            idPlayer={commonId}
            {...zone}
          />)
      }
    </StyledCommon>
  )
}

export default Common
