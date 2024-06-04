import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { MDBTabs, MDBTabsItem, MDBTabsLink, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { Context } from '..';

const TypeBar = observer(() => {
    const { product } = useContext(Context);

    const handleTypeClick = (type) => {
        product.setSelectedType(type);
    };

    return (
        <>
            <MDBTabs fill className='mb-3'>
                {product.types.map((type) => (
                    <MDBTabsItem key={type.id}>
                        <MDBTabsLink
                            onClick={() => handleTypeClick(type)}
                            active={type.id === product.selectedType?.id}
                            style={{ color: 'black' }} // Set text color to black
                        >
                            {type.name}
                        </MDBTabsLink>
                    </MDBTabsItem>
                ))}
            </MDBTabs>

            <MDBTabsContent>
                {product.types.map((type) => (
                    <MDBTabsPane key={type.id} open={type.id === product.selectedType?.id}>
                        {/* {`Content for ${type.name}`} */}
                    </MDBTabsPane>
                ))}
            </MDBTabsContent>
        </>
    );
});

export default TypeBar;