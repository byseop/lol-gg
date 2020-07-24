import React from 'react';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';

export type SlotPropTypes = {
  index: number;
  data: any;
  type: string;
  id: string | number;
  image: string;
};

function Slot({ index, data, type, id, image }: SlotPropTypes) {
  return (
    <div>
      {id ? (
        <>
          <picture data-tip data-for={`${type}-${index}-${id}`}>
            <img src={image} alt={String(id)} />
          </picture>

          <SlotTooltip id={`${type}-${index}-${id}`} effect="solid">
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
    width: 72px;
    height: 72px;
    margin-right: 1.5rem;
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
`;
