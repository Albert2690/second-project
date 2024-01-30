import React from 'react'

function HashLoader() {
  return (
  
         <div className="sweet-loading">
          <HashLoader
           sizeUnit={"px"}
           size={190}
           color={"#123abc"}
           loading={this.state.loading}
          />
         </div>
        );
       
  
}

export default HashLoader