import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
export type SlotPropTypes = {
  index: number;
  data: any;
  type: string;
  id: string | number;
  image: string;
};

function Slot({ index, data, type, id, image }: SlotPropTypes) {
  const uuid = uuidv4();
  if (!data) return <div />;
  return (
    <div>
      {id ? (
        <>
          <picture data-tip data-for={`${type}-${index}-${id}-${uuid}`}>
            <img src={image} alt={String(id)} />
          </picture>

          <SlotTooltip id={`${type}-${index}-${id}-${uuid}`} effect="solid">
            <picture>
              <img src={image} alt={String(id)} />
            </picture>
            <div>
              <span className="tooltip-text-title">{data.name}</span>
              <span
                dangerouslySetInnerHTML={{
                  __html: data.description || data.shortDesc || ''
                }}
                className="tooltip-text-des"
              />
            </div>
          </SlotTooltip>
        </>
      ) : null}
    </div>
  );
}

export default React.memo(Slot);

const SlotTooltip = styled(ReactTooltip)`
  display: flex;
  padding: 1.5rem;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
  picture {
    width: 72px !important;
    height: 72px !important;
    margin-right: 1.5rem;

    > img {
      display: block;
      width: 100%;
    }
  }

  > div {
    span {
      display: block;
    }
  }

  .tooltip-text-title {
    color: #fff;
    font-size: 16px;
    font-weight: bold;
  }

  .tooltip-text-des {
    max-width: 200px;
    margin-top: 0.5rem;
    line-height: 1.4;
    color: #c5c5c5;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  stats {
    font-weight: bold;
    color: lightgoldenrodyellow;
  }
  passive {
    font-weight: bold;
    color: white;
  }
  active,
  unique {
    font-weight: bold;
    color: lightcoral;
  }
`;
