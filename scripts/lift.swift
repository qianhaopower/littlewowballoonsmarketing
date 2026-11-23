// Subject lifting with the macOS Vision framework.
// usage: swift lift.swift <input image> <output mask png> [instances: all | 1,2,...]
import AppKit
import CoreImage
import Foundation
import Vision

let args = CommandLine.arguments
guard args.count >= 3 else {
    FileHandle.standardError.write("usage: lift.swift <in> <out.png> [all|1,2]\n".data(using: .utf8)!)
    exit(2)
}
let input = URL(fileURLWithPath: args[1])
let output = URL(fileURLWithPath: args[2])

guard let source = CIImage(contentsOf: input, options: [.applyOrientationProperty: true]) else {
    FileHandle.standardError.write("cannot read image\n".data(using: .utf8)!)
    exit(1)
}
let context = CIContext()
guard let cg = context.createCGImage(source, from: source.extent) else { exit(1) }

let request = VNGenerateForegroundInstanceMaskRequest()
let handler = VNImageRequestHandler(cgImage: cg, options: [:])
try handler.perform([request])
guard let result = request.results?.first else {
    FileHandle.standardError.write("no foreground found\n".data(using: .utf8)!)
    exit(1)
}

var wanted = result.allInstances
if args.count >= 4, args[3] != "all" {
    wanted = IndexSet(args[3].split(separator: ",").compactMap { Int($0) })
}
print("instances found: \(result.allInstances.map { $0 }), using: \(wanted.map { $0 })")

let buffer = try result.generateScaledMaskForImage(forInstances: wanted, from: handler)
let mask = CIImage(cvPixelBuffer: buffer)
let grey = CGColorSpace(name: CGColorSpace.linearGray)!
try context.writePNGRepresentation(of: mask, to: output, format: .L8, colorSpace: grey)
print("mask \(Int(mask.extent.width))x\(Int(mask.extent.height)) -> \(output.path)")
