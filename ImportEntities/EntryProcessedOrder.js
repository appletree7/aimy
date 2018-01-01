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
    public class ProcessedOrdersEntry : ImportObjectBase {
	  [XmlAttribute]
	  public int Period { get; set; }

	  [XmlAttribute]
	  public int OrderNumber { get; set; }

	  [XmlAttribute]
	  public int BatchNumber { get; set; }

	  [XmlAttribute]
	  public string Item { get; set; }

	  [XmlAttribute]
	  public int Quantity { get; set; }

	  [XmlAttribute]
	  public int CycleTime { get; set; }

	  [XmlAttribute("Cost")]
	  public string CostString { get; set; }

	  [XmlIgnore]
	  public double Cost {
		get {
		    return ToDouble(CostString);
		}
	  }

    }
}
