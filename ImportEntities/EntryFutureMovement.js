/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace IbsysPlanspielApp.ImportEntities {
    public class FutureInwardStockMovementEntry : ImportObjectBase {
        [XmlAttribute("OrderNumber")]
        public string OrderNumberString { get; set; }

	  [XmlIgnore]
	  public long ArticleId {
		get {
		    return IdFromItem(Item);
		}
	  }
	  [XmlIgnore]
	  public string ArticleName {
		get {
		    return NameFromItem(Item);
		}
	  }

        [XmlIgnore]
        public int OrderNumber {
            get {
                return Convert.ToInt32(OrderNumberString.Split('-')[1].Trim());
            }
        }

        [XmlIgnore]
        public int OrderedPeriod {
            get {
                return Convert.ToInt32(OrderNumberString.Split('-')[0].Trim());
            }
        }

        [XmlAttribute("Supplier")]
        public string SupplierString { get; set; }

        [XmlIgnore]
        public SupplierEnum Supplier {
            get {
                if(SupplierString.Equals("Fast"))
                    return SupplierEnum.Fast;
                if(SupplierString.Equals("Normal"))
                    return SupplierEnum.Normal;

                return SupplierEnum.Undefined;
            }
        }

        [XmlAttribute("Item")]
        public string Item { get; set; }
	  
        [XmlAttribute("ItemNumber")]
        public int ItemNumber { get; set; }

        [XmlAttribute("Quantity")]
        public int Quantity { get; set; }
    }
}
