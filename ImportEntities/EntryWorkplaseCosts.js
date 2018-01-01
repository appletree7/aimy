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
    public class WorkplaceCostsEntry : ImportObjectBase {
	   [XmlAttribute]
	   public int WorkplaceNumber { get; set; }

	   [XmlAttribute]
	   public int MountEvents { get; set; }

	   [XmlAttribute]
	   public int IdleTime { get; set; }

	   [XmlAttribute]
	   public int WorkTime { get; set; }

	   [XmlAttribute("MachineFixCost")]
	   public string MachineFixCostString { get; set; }

	   [XmlIgnore]
	   public double MachineFixCost {
		  get {
			 return ToDouble(MachineFixCostString);
		  }
	   }

	   [XmlAttribute("MachineVariableCost")]
	   public string MachineVariableCostString { get; set; }

	   [XmlIgnore]
	   public double MachineVariableCost {
		  get {
			 return ToDouble(MachineVariableCostString);
		  }
	   }

	   [XmlAttribute("IdleWageCost")]
	   public string IdleWageCostString { get; set; }

	   [XmlIgnore]
	   public double IdleWageCost {
		  get {
			 return ToDouble(IdleWageCostString);
		  }
	   }

	   [XmlAttribute("ProductionWageCost")]
	   public string ProductionWageCostString { get; set; }

	   [XmlIgnore]
	   public double ProductionWageCost {
		  get {
			 return ToDouble(ProductionWageCostString);
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

    }
}
