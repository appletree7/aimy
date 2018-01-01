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
    public class InwardStockMovementEntry : ImportObjectBase {
        [XmlAttribute("OrderNumber")]
        public string OrderNumberString { get; set; }

        [XmlIgnore]
        public int OrderNumber{
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
        public string ItemString { get; set; }

        [XmlAttribute("OrderedQuantity")]
        public int OrderedQuantity { get; set; }

        [XmlAttribute("DeliveredQuantity")]
        public int DeliveredQuantity { get; set; }

        [XmlAttribute("Arrival")]
        public string Arrival { get; set; }

        [XmlAttribute("Available")]
        public string AvailableString { get; set; }

        [XmlIgnore]
        public AvailableEnum Available {
            get {
                if(AvailableString.Equals("On Arrival"))
                    return AvailableEnum.OnArrival;
                if(AvailableString.Equals("Next Period"))
                    return AvailableEnum.NextPeriod;

                return AvailableEnum.Undefined;
            }
        }

        [XmlAttribute("MaterialCost")]
        public string MaterialCostString { get; set; }

        [XmlIgnore]
        public double MaterialCost {
            get {
                return ToDouble(MaterialCostString);
            }
        }

        [XmlAttribute("OrderCost")]
        public string OrderCostString { get; set; }

        [XmlIgnore]
        public double OrderCost {
            get {
                return ToDouble(OrderCostString);
            }
        }

        [XmlAttribute("TotalCost")]
        public string TotalCostString { get; set; }

        [XmlIgnore]
        public double TotalCost {
            get {
                return ToDouble(TotalCostString);
            }
        }

        [XmlAttribute("PieceCost")]
        public string PieceCostString { get; set; }

        [XmlIgnore]
        public double PieceCost {
            get {
                return ToDouble(PieceCostString);
            }
        }

    }
}
